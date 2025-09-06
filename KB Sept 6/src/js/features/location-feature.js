/**
 * LOCATION FEATURE
 * ==================
 * This file contains the feature logic for the Area Code lookup. It has been
 * streamlined to support the new popover UI, removing the suggestion dropdown
 * in favor of displaying results directly.
 */

const LocationFeature = {
  // A pre-processed, searchable list of area codes and their locations.
  searchableAreaCodes: [],

  /**
   * Initializes the location feature by processing the raw data from
   * locations.js into a searchable format. Called once at startup.
   */
  init() {
    if (typeof AREA_CODES !== 'undefined') {
        this.searchableAreaCodes = Object.keys(AREA_CODES).map(code => {
            return { code: code, location: AREA_CODES[code] };
        });
    }
  },

  /**
   * Handles live input from the user in the area lookup box. When the user
   * enters a valid 3-digit area code, it performs the search and calls the
   * UI to display the results.
   */
  handleInput() {
    const query = dom.areaLookupInput.value.trim();

    // Clear previous results if the input is not a 3-digit code.
    if (query.length !== 3) {
      UI.Location.clearResults();
      return;
    }

    const locationName = AREA_CODES[query];
    if (!locationName) {
      UI.Location.displayNoResults(query);
      return;
    }

    // Find all biller TLAs associated with the location (state/province).
    const billerTLAs = LOCATION_BILLERS[locationName] || [];
    
    // Find the full biller objects from the main BILLERS array.
    const foundBillers = billerTLAs.map(tla => {
        // Handle complex TLA strings like "BGE - NSRC" by taking the first part.
        const cleanTla = tla.split('-')[0].trim();
        return BILLERS.find(biller => biller.tla === cleanTla || (biller.aliases && biller.aliases.includes(cleanTla)));
    }).filter(Boolean); // Filter out any undefined results if a biller wasn't found.

    const locationData = {
      areaCode: query,
      name: locationName,
      billers: foundBillers,
    };

    // Call the UI to render the final list of billers in the results box.
    UI.Location.displayResults(locationData);
  },
};