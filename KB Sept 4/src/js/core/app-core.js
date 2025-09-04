/**
 * APP CORE
 * ==================
 * UPDATED: DATA_VERSION has been incremented to 4 to invalidate the old
 * cache and force a reload of the new biller data (CEB).
 *
 * This file manages the application's state, caches DOM elements,
 * and houses core event handlers and selection logic.
 */

// --- GLOBAL APP VARIABLES ---
const DATA_VERSION = 4; // Incremented from 3 to 4
let searchWorker;
let searchService;

// --- GLOBAL APPLICATION STATE ---
const state = {
    activeSuggestionIndex: -1,
    currentSuggestions: [],
    activeDrawer: null,
    activeModal: null,
    activePopover: null,
    searchHistory: Utils.storageGet('biller-searchHistory', []),
    settings: {}
};

// --- DOM ELEMENT CACHE ---
const dom = {
    // Search & Main Content
    searchWrapper: document.getElementById('searchWrapper'),
    searchInput: document.getElementById('searchInput'),
    suggestionsList: document.getElementById('suggestionsList'),
    billerCard: document.getElementById('billerCard'),
    locationCard: document.getElementById('locationCard'),
    
    // Header Actions
    themeSelector: document.getElementById('themeSelector'),
    favoritesBtn: document.getElementById('favoritesBtn'),
    directoryBtn: document.getElementById('directoryBtn'),
    toolsBtn: document.getElementById('toolsBtn'),
    settingsBtn: document.getElementById('settingsBtn'),

    // Area Zip Lookup
    areaZipLookup: document.getElementById('areaZipLookup'),
    locationLookupWrapper: document.getElementById('locationLookupWrapper'),
    locationInput: document.getElementById('locationInput'),
    locationSuggestionsList: document.getElementById('locationSuggestionsList'),
    locationResultsBox: document.getElementById('locationResultsBox'),

    // Popover & Modals
    settingsPopover: document.getElementById('settingsPopover'),
    directoryModal: document.getElementById('directoryModal'),
    directoryModalList: document.getElementById('directoryModalList'),
    directoryCloseBtn: document.getElementById('directoryCloseBtn'),

    // Right-side Drawer (Tools)
    toolsPanel: document.getElementById('toolsPanel'),
    toolsPanelTemplate: document.getElementById('toolsPanelTemplate'),

    // Settings Toggles & Actions
    toggleAreaZipUI: document.getElementById('toggleAreaZipUI'),
    toggleSuggestions: document.getElementById('toggleSuggestions'),
    toggleCompactDensity: document.getElementById('toggleCompactDensity'),
    toggleAnalytics: document.getElementById('toggleAnalytics'),
    toggleDebugLog: document.getElementById('toggleDebugLog'),
    resetCacheBtn: document.getElementById('resetCacheBtn'),

    // Debug
    debugLog: document.getElementById('debugLog'),

    // Favorites
    favoritesSection: document.getElementById('favoritesSection'),
    favoritesList: document.getElementById('favoritesList'),

    // Analytics & Banners
    analyticsDiv: document.getElementById('analyticsDiv'),
    analyticsChart: document.getElementById('analyticsChart'),
    notificationBanner: document.getElementById('notificationBanner'),
};

// --- CORE LOGIC & EVENT HANDLERS ---

function handleSearchInput() {
    if (!state.settings.suggestionsEnabled) {
        UI.clearSuggestions();
        return;
    }
    const query = dom.searchInput.value.trim();
    if (query.length < 1) {
        UI.clearSuggestions();
        return;
    }
    
    if (searchWorker) {
        searchWorker.postMessage({ type: 'SEARCH', payload: { query } });
    } else if (searchService) {
        const results = searchService.search(query);
        const minimalResults = results.map(result => result.item);
        state.currentSuggestions = minimalResults;
        UI.renderSuggestions(state.currentSuggestions, query);
    }
}

function selectBillerById(id) {
    try {
        const biller = DataHelpers.getBillerById(BILLERS, id);
        if (biller) {
            dom.searchInput.value = biller.name;
            dom.locationInput.value = '';
            UI.clearSuggestions();
            UI.Location.clearSuggestions();
            dom.locationCard.hidden = true;
            UI.displayBiller(biller);
            Features.Analytics.logBillerView(biller);
        } else {
            console.warn(`Biller with ID "${id}" not found.`);
            UI.showNotification(`Could not find details for the selected biller.`, 'error');
        }
    } catch (error) {
        console.error('Error displaying biller details:', error);
        UI.showNotification('An error occurred while displaying biller details.', 'error');
    }
}

function handleDocumentClick(e) {
    if (!dom.searchWrapper.contains(e.target)) {
        UI.clearSuggestions();
    }
    if (dom.locationLookupWrapper && !dom.locationLookupWrapper.contains(e.target)) {
        UI.Location.clearSuggestions();
    }
    if (state.activePopover && !dom.settingsBtn.contains(e.target) && !dom.settingsPopover.contains(e.target)) {
        UI.Popover.close(state.activePopover.popover, state.activePopover.button);
    }
}

function handleSearchKeydown(e) {
    const { key } = e;
    const suggestionsCount = state.currentSuggestions.length;
    if (suggestionsCount === 0 && key !== 'Enter') return;

    switch (key) {
        case 'ArrowDown':
            e.preventDefault();
            state.activeSuggestionIndex = (state.activeSuggestionIndex + 1) % suggestionsCount;
            UI.updateActiveSuggestion();
            break;
        case 'ArrowUp':
            e.preventDefault();
            state.activeSuggestionIndex = (state.activeSuggestionIndex - 1 + suggestionsCount) % suggestionsCount;
            UI.updateActiveSuggestion();
            break;
        case 'Enter':
            e.preventDefault();
            if (state.activeSuggestionIndex > -1) {
                selectBillerById(state.currentSuggestions[state.activeSuggestionIndex].id);
            } else if (state.currentSuggestions.length > 0) {
                selectBillerById(state.currentSuggestions[0].id);
            }
            break;
        case 'Escape':
            UI.clearSuggestions();
            break;
    }
}

function handleSuggestionClick(e) {
    const target = e.target.closest('.suggestion-item');
    if (target && target.dataset.id) {
        selectBillerById(target.dataset.id);
    }
}