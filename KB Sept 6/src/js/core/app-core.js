/**
 * APP CORE
 * ==================
 * This file manages the application's state, caches DOM elements,
 * and houses core event handlers and selection logic.
 *
 * UPDATED: The DOM cache is fully revised to support the new header-driven
 * popover UI. The global document click handler now uses the UI.Popovers module.
 */

// --- GLOBAL APP VARIABLES ---
const DATA_VERSION = 6; // Incremented for major UI overhaul
let searchWorker;
let searchService;

// --- GLOBAL APPLICATION STATE ---
const state = {
    activeSuggestionIndex: -1,
    currentSuggestions: [],
    activeDrawer: null,
    activeModal: null,
    activePopover: null, // Managed by the UI.Popovers module
    searchHistory: Utils.storageGet('biller-searchHistory', []),
    settings: {}
};

// --- DOM ELEMENT CACHE (REVISED FOR NEW UI) ---
const dom = {
    // Search & Main Content
    searchWrapper: document.getElementById('searchWrapper'),
    searchInput: document.getElementById('searchInput'),
    suggestionsList: document.getElementById('suggestionsList'),
    billerCard: document.getElementById('billerCard'),
    locationCard: document.getElementById('locationCard'),
    
    // Header Actions & Popovers
    directoryBtn: document.getElementById('directoryBtn'),
    toolsBtn: document.getElementById('toolsBtn'),
    
    favoritesPopoverBtn: document.getElementById('favoritesPopoverBtn'),
    favoritesPopover: document.getElementById('favoritesPopover'),
    favoritesList: document.getElementById('favoritesList'),

    areaLookupPopoverBtn: document.getElementById('areaLookupPopoverBtn'),
    areaLookupPopover: document.getElementById('areaLookupPopover'),
    areaLookupInput: document.getElementById('areaLookupInput'),
    areaLookupResultsBox: document.getElementById('areaLookupResultsBox'),
    
    themePopoverBtn: document.getElementById('themePopoverBtn'),
    themePopover: document.getElementById('themePopover'),
    themeSelector: document.getElementById('themeSelector'),

    settingsBtn: document.getElementById('settingsBtn'),
    settingsPopover: document.getElementById('settingsPopover'),

    // Settings Controls
    decreaseFontBtn: document.getElementById('decreaseFontBtn'),
    increaseFontBtn: document.getElementById('increaseFontBtn'),
    resetCacheBtn: document.getElementById('resetCacheBtn'),

    // Modals & Drawers
    directoryModal: document.getElementById('directoryModal'),
    directoryCloseBtn: document.getElementById('directoryCloseBtn'),
    toolsPanel: document.getElementById('toolsPanel'),
    toolsPanelTemplate: document.getElementById('toolsPanelTemplate'),

    // Analytics & Banners
    analyticsDiv: document.getElementById('analyticsDiv'),
    analyticsChart: document.getElementById('analyticsChart'),
    notificationBanner: document.getElementById('notificationBanner'),
    debugLog: document.getElementById('debugLog'),
};

// --- CORE LOGIC & EVENT HANDLERS ---

function handleSearchInput() {
    if (state.settings && !state.settings.suggestionsEnabled) {
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
            if (dom.areaLookupInput) dom.areaLookupInput.value = '';
            UI.clearSuggestions();
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
    if (dom.searchWrapper && !dom.searchWrapper.contains(e.target)) {
        UI.clearSuggestions();
    }
    // The Popovers module provides a single function to close any active popover.
    if (state.activePopover && !state.activePopover.popover.contains(e.target)) {
        UI.Popovers.closeActive();
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