/**
 * APP MAIN
 * ==================
 * This is the application's main entry point. It orchestrates the initialization
 * of all features, services, and UI components, and attaches all primary
 * event listeners to make the application interactive.
 */

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        if (typeof BILLERS === 'undefined' || BILLERS.length === 0) {
            console.error("CRITICAL: The 'biller-data-all.js' file is missing or failed to load. Application cannot start.");
            UI.showNotification("CRITICAL: Biller data failed to load. Please reset the application.", "error");
            return;
        }

        console.log(`Biller data loaded successfully with ${BILLERS.length} records.`);
        
        // Initialize all core features in a logical order
        ThemeFeature.init();
        Features.FontSize.init();
        Features.Settings.init();
        LocationFeature.init();
        Features.Favorites.init();
        Features.Analytics.init();
        UI.Popovers.init(); // This now handles the settings button listener

        // Initialize the search service (using Fuse.js or a fallback)
        initializeSearchService();
        
        // Enable the search input now that everything is ready
        dom.searchInput.disabled = false;
        dom.searchInput.placeholder = "Search by name or TLA...";

        // Attach all remaining event listeners
        attachEventListeners();
        console.log("Ultimate Biller Hub initialized successfully.");

    } catch (error) {
        console.error("A critical error occurred during initialization:", error);
        UI.showNotification("A critical error occurred. Please try resetting the application.", "error");
    }
}

function initializeSearchService() {
    console.log('Using main-thread search.');
    const useFuse = typeof Fuse !== 'undefined';
    if (useFuse) {
        searchService = new Fuse(BILLERS, {
            keys: [{ name: 'tla', weight: 0.8 }, { name: 'name', weight: 0.6 }, { name: 'aliases', weight: 0.4 }],
            includeScore: true,
            threshold: 0.4,
            minMatchCharLength: 2,
        });
        console.log('Fuse.js search initialized.');
    } else {
        searchService = {
            search: (query) => {
                const lowerQuery = query.toLowerCase();
                return BILLERS.filter(b =>
                    b.name.toLowerCase().includes(lowerQuery) ||
                    b.tla.toLowerCase().includes(lowerQuery)
                ).map(item => ({ item }));
            }
        };
        console.log('Fallback search initialized.');
    }
}

function attachEventListeners() {
    // Main Search
    dom.searchInput.addEventListener('input', Utils.debounce(handleSearchInput, 150));
    dom.searchInput.addEventListener('keydown', handleSearchKeydown);
    dom.suggestionsList.addEventListener('click', handleSuggestionClick);

    // Area Lookup (in a popover)
    dom.areaLookupInput.addEventListener('input', Utils.debounce(LocationFeature.handleInput.bind(LocationFeature), 200));

    // Header Buttons
    dom.directoryBtn.addEventListener('click', () => UI.Modal.open(dom.directoryModal));
    dom.toolsBtn.addEventListener('click', () => UI.Tools.toggle());
    
    // NOTE: Listeners for popover buttons (Favorites, Area, Theme, Settings) are now handled by UI.Popovers.init()
    
    // Modal & Drawer Close Buttons
    dom.directoryCloseBtn.addEventListener('click', () => UI.Modal.close(dom.directoryModal));
    
    // Settings Controls
    dom.settingsPopover.addEventListener('change', (e) => {
        if (e.target.closest('.toggle-switch')) Features.Settings.handleToggle(e);
    });
    dom.increaseFontBtn.addEventListener('click', () => Features.FontSize.increase());
    dom.decreaseFontBtn.addEventListener('click', () => Features.FontSize.decrease());
    dom.resetCacheBtn.addEventListener('click', Features.System.resetApplication);

    // Global Listeners
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleGlobalKeydown);
}

function handleGlobalKeydown(e) {
    if (e.key === 'Escape') {
        if (state.activeModal) UI.Modal.close(state.activeModal);
        else if (state.activeDrawer) UI.Drawer.close(state.activeDrawer);
        else if (state.activePopover) UI.Popovers.closeActive();
        else UI.clearSuggestions();
    }

    const shortcuts = { 'D': dom.directoryBtn, 'W': dom.toolsBtn };
    const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

    if (!isTyping && shortcuts[e.key.toUpperCase()]) {
        e.preventDefault();
        shortcuts[e.key.toUpperCase()]?.click();
    }
}