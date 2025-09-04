/**
 * APP MAIN (File Protocol Compatibility Version)
 * ==================
 * This is a simplified version of the application's main script, specifically
 * modified to work reliably when run from the local file system (file://).
 *
 * It removes all features that require a web server:
 * - IndexedDB caching has been disabled.
 * - The Web Worker for search has been removed in favor of the main-thread fallback.
 * - The Service Worker registration has been removed.
 * - Dynamic data loading has been replaced by direct script loading in index.html.
 */

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Check if the main BILLERS array was loaded correctly
    if (typeof BILLERS === 'undefined' || BILLERS.length === 0) {
        console.error("CRITICAL: The 'biller-data-all.js' file is missing or failed to load. Application cannot start.");
        document.body.innerHTML = `<div style="padding: 2rem; text-align: center;"><h1>Application Error</h1><p>CRITICAL: The 'biller-data-all.js' file is missing or failed to load. Please check the file path in index.html.</p></div>`;
        return;
    }

    console.log(`Biller data loaded successfully with ${BILLERS.length} records.`);
    
    // Initialize all core features
    Features.Settings.init();
    Features.Theme.init();
    LocationFeature.init();

    // The app will ALWAYS use the main-thread search in this version.
    console.log('Using main-thread search.');
    const useFuse = typeof Fuse !== 'undefined';
    if (useFuse) {
        // Initialize Fuse.js for high-quality fuzzy searching
        searchService = new Fuse(BILLERS, {
            keys: [{ name: 'tla', weight: 0.8 }, { name: 'name', weight: 0.6 }, { name: 'aliases', weight: 0.4 }],
            includeScore: true,
            threshold: 0.4,
            minMatchCharLength: 2,
        });
        console.log('Fuse.js search initialized.');
    } else {
        // Initialize a simple fallback search if Fuse.js is not available
        searchService = {
            search: (query) => {
                const lowerQuery = query.toLowerCase();
                return BILLERS.filter(b =>
                    b.name.toLowerCase().includes(lowerQuery) ||
                    b.tla.toLowerCase().includes(lowerQuery)
                ).map(item => ({ item })); // Ensure results have the {item: ...} structure like Fuse
            }
        };
        console.log('Fallback search initialized.');
    }
    
    // Enable the search input now that the search service is ready
    dom.searchInput.disabled = false;
    dom.searchInput.placeholder = "Search by name, TLA, or alias...";

    // Initialize remaining UI features and attach all event listeners
    dom.resetCacheBtn.addEventListener('click', Features.System.resetApplication);
    UI.Modal.open(dom.directoryModal);
    UI.Modal.close(dom.directoryModal);
    Features.Favorites.init();
    Features.Analytics.init();
    Utils.onOfflineStatusChange(UI.updateOfflineIndicator);

    attachEventListeners();
    console.log("Ultimate Biller Hub initialized successfully in compatibility mode.");
}

function attachEventListeners() {
    dom.searchInput.addEventListener('input', Utils.debounce(handleSearchInput, 150));
    dom.searchInput.addEventListener('keydown', handleSearchKeydown);
    dom.suggestionsList.addEventListener('click', handleSuggestionClick);

    dom.locationInput.addEventListener('input', Utils.debounce(LocationFeature.handleInput.bind(LocationFeature), 200));
    dom.locationInput.addEventListener('keydown', (e) => LocationFeature.handleKeydown(e));
    dom.locationSuggestionsList.addEventListener('click', (e) => LocationFeature.handleSuggestionClick(e));

    dom.favoritesBtn.addEventListener('click', () => UI.Favorites.toggleVisibility());
    dom.directoryBtn.addEventListener('click', () => UI.Modal.open(dom.directoryModal));
    dom.directoryCloseBtn.addEventListener('click', () => UI.Modal.close(dom.directoryModal));
    dom.toolsBtn.addEventListener('click', () => UI.Tools.toggle());
    dom.settingsBtn.addEventListener('click', () => UI.Popover.toggle(dom.settingsPopover, dom.settingsBtn));

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleGlobalKeydown);

    dom.settingsPopover.addEventListener('change', (e) => {
        if (e.target.closest('.toggle-switch')) Features.Settings.handleToggle(e);
    });
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