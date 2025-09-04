/**
 * LOCATION FEATURE
 * ==================
 * This file contains the complete, self-contained feature logic for the
 * upgraded Area/ZIP Code lookup. It processes the data from locations.js
 * and handles all user interactions for this feature.
 */

const LocationFeature = {
  // Local state for this feature
  searchableAreaCodes: [],
  currentSuggestions: [],
  activeSuggestionIndex: -1,

  /**
   * Initializes the location feature by processing the raw data into a
   * searchable format. Called once when the application starts.
   */
  init() {
    this.searchableAreaCodes = Object.keys(AREA_CODES).map(code => {
      return { code: code, location: AREA_CODES[code] };
    });
  },

  /**
   * Handles the live input from the user in the location search box.
   */
  handleInput() {
    const query = dom.locationInput.value.trim();
    dom.locationResultsBox.hidden = true; // Hide previous results
    dom.locationResultsBox.innerHTML = '';

    if (query.length < 2) { // Start searching after 2 chars
      UI.Location.clearSuggestions();
      return;
    }

    // Filter the pre-processed list to find matching area codes
    const suggestions = this.searchableAreaCodes.filter(item => item.code.startsWith(query));
    this.currentSuggestions = suggestions;

    // Call the UI to render the suggestions
    UI.Location.renderSuggestions(suggestions);
  },

  /**
   * Handles keyboard navigation (up, down, enter, escape) for the suggestion list.
   * @param {KeyboardEvent} e The keyboard event.
   */
  handleKeydown(e) {
    const { key } = e;
    const suggestionsCount = this.currentSuggestions.length;
    if (suggestionsCount === 0) return;

    switch (key) {
      case 'ArrowDown':
        e.preventDefault();
        this.activeSuggestionIndex = (this.activeSuggestionIndex + 1) % suggestionsCount;
        UI.Location.updateActiveSuggestion(this.activeSuggestionIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.activeSuggestionIndex = (this.activeSuggestionIndex - 1 + suggestionsCount) % suggestionsCount;
        UI.Location.updateActiveSuggestion(this.activeSuggestionIndex);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.activeSuggestionIndex > -1) {
          const selectedSuggestion = this.currentSuggestions[this.activeSuggestionIndex];
          this.selectLocation(selectedSuggestion.code);
        }
        break;
      case 'Escape':
        UI.Location.clearSuggestions();
        break;
    }
  },

  /**
   * Handles a click on a suggestion item.
   * @param {MouseEvent} e The mouse event.
   */
  handleSuggestionClick(e) {
    const target = e.target.closest('.suggestion-item');
    if (target && target.dataset.code) {
      this.selectLocation(target.dataset.code);
    }
  },

  /**
   * Performs the lookup and triggers the UI to display both the main biller
   * card and the persistent list of billers in the sidebar.
   * @param {string} areaCode The selected 3-digit area code.
   */
  selectLocation(areaCode) {
    const locationName = AREA_CODES[areaCode];
    if (!locationName) {
      UI.Location.clearSuggestions();
      return;
    }

    const billerTLAs = LOCATION_BILLERS[locationName] || [];
    const foundBillers = billerTLAs.map(tla => {
        // Handle cases like "BGE - NSRC" by taking the first part
        const cleanTla = tla.split('-')[0].trim();
        return BILLERS.find(biller => biller.tla === cleanTla || (biller.aliases && biller.aliases.includes(cleanTla)));
    }).filter(Boolean); // Filter out any undefined results

    const locationData = {
      areaCode: areaCode,
      name: locationName,
      billers: foundBillers,
    };

    // If billers are found, select the first one to display in the main card.
    if (foundBillers.length > 0) {
        selectBillerById(foundBillers[0].id);
    } else {
        dom.billerCard.hidden = true;
    }

    // Always display the persistent list of associated billers in the sidebar.
    UI.Location.displayPersistentBillerList(locationData);
    
    UI.Location.clearSuggestions();
    dom.locationInput.value = areaCode;
  },
};