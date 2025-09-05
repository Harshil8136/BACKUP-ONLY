/**
 * APP MAIN
 * ==================
 * This is the definitive, most robust version of the application's orchestrator,
 * designed to be resilient against errors and prevent the application from
 * freezing.
 */

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        // Check if the main BILLERS array was loaded correctly
        if (typeof BILLERS === 'undefined' || BILLERS.length === 0) {
            throw new Error("The 'biller-data-all.js' file is missing or failed to load. Application cannot start.");
        }
        console.log(`Biller data loaded successfully with ${BILLERS.length} records.`);

        // CRITICAL STEP: Validate that all required HTML elements exist before proceeding.
        validateDom();

        // Initialize CORE features. These are essential for the app to run.
        Features.Settings.init();
        Features.Theme.init();

        // Initialize NON-CRITICAL features in isolated blocks.
        // If one fails, it will be logged, but it will not crash the entire application.
        try {
            LocationFeature.init();
        } catch (e) {
            console.error("Location Feature failed to initialize:", e);
        }
        try {
            Features.Favorites.init();
        } catch (e) {
            console.error("Favorites Feature failed to initialize:", e);
        }
        try {
            Features.Analytics.init();
        } catch (e) {
            console.error("Analytics Feature failed to initialize:", e);
        }
        try {
            Utils.onOfflineStatusChange(UI.updateOfflineIndicator);
        } catch (e) {
            console.error("Offline Indicator failed to initialize:", e);
        }

        // Initialize the main-thread search service.
        console.log('Using main-thread search.');
        if (typeof Fuse !== 'undefined') {
            state.searchService = new Fuse(BILLERS, {
                keys: [{ name: 'tla', weight: 0.8 }, { name: 'name', weight: 0.6 }, { name: 'aliases', weight: 0.4 }],
                threshold: 0.4,
                minMatchCharLength: 2,
            });
            console.log('Fuse.js search initialized.');
        } else {
            // Fallback search if Fuse.js is not available
        }
        
        dom.searchInput.disabled = false;
        dom.searchInput.placeholder = "Search by name, TLA, or alias...";

        // Attach all event listeners
        attachEventListeners();
        console.log("Ultimate Biller Hub initialized successfully.");

    } catch (error) {
        console.error("A critical error occurred during application initialization:", error);
        document.body.innerHTML = `<div style="padding: 2rem; text-align: center;"><h1>Application Error</h1><p>A critical error occurred. Please check the in-page console for details (Alt+L to toggle).</p><p><em>${error.message}</em></p></div>`;
    }
}

/**
 * Attaches all global event listeners to the DOM.
 * This function is now resilient and will not crash if a DOM element is missing.
 */
function attachEventListeners() {
    if (dom.searchInput) {
        dom.searchInput.addEventListener('input', Utils.debounce(handleSearchInput, 150));
        dom.searchInput.addEventListener('keydown', handleSearchKeydown);
    }
    if (dom.suggestionsList) {
        dom.suggestionsList.addEventListener('click', handleSuggestionClick);
    }

    if (dom.locationInput) {
        dom.locationInput.addEventListener('input', Utils.debounce(LocationFeature.handleInput.bind(LocationFeature), 200));
        dom.locationInput.addEventListener('keydown', (e) => LocationFeature.handleKeydown(e));
    }
    if (dom.locationSuggestionsList) {
        dom.locationSuggestionsList.addEventListener('click', (e) => LocationFeature.handleSuggestionClick(e));
    }

    if (dom.favoritesBtn) dom.favoritesBtn.addEventListener('click', () => UI.Favorites.toggleVisibility());
    if (dom.directoryBtn) dom.directoryBtn.addEventListener('click', () => UI.Modal.open(dom.directoryModal));
    if (dom.directoryCloseBtn) dom.directoryCloseBtn.addEventListener('click', () => UI.Modal.close(dom.directoryModal));
    if (dom.toolsBtn) dom.toolsBtn.addEventListener('click', () => UI.Tools.toggle());
    if (dom.settingsBtn) dom.settingsBtn.addEventListener('click', () => UI.Popover.toggle(dom.settingsPopover, dom.settingsBtn));
    if (dom.resetCacheBtn) dom.resetCacheBtn.addEventListener('click', () => Features.System.resetApplication());

    if (dom.settingsPopover) {
        dom.settingsPopover.addEventListener('change', (e) => {
            if (e.target.closest('.toggle-switch')) Features.Settings.handleToggle(e);
        });
    }

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleGlobalKeydown);
}

function handleGlobalKeydown(e) {
    if (e.key === 'Escape') {
        if (state.activeModal) UI.Modal.close(state.activeModal);
        else if (state.activeDrawer) UI.Drawer.close(state.activeDrawer);
        else if (state.activePopover) UI.Popover.close(state.activePopover.popover, state.activePopover.button);
        else UI.clearSuggestions();
    }

    const shortcuts = { 'F': dom.favoritesBtn, 'D': dom.directoryBtn, 'W': dom.toolsBtn };
    const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
    if (!isTyping && shortcuts[e.key.toUpperCase()]) {
        e.preventDefault();
        shortcuts[e.key.toUpperCase()]?.click();
    }
}