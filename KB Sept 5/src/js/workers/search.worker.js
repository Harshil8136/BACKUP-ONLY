/**
 * SEARCH WORKER
 * ==================
 * This script runs in a separate thread to handle all data indexing and
 * fuzzy searching, keeping the main UI thread free and responsive.
 */

let searchService;
let BILLERS = [];

/**
 * Main message handler for the worker.
 * It listens for commands from the main thread.
 */
self.onmessage = function(event) {
  const { type, payload } = event.data;

  switch (type) {
    case 'INIT':
      initialize(payload);
      break;
    case 'SEARCH':
      search(payload.query);
      break;
  }
};

/**
 * Initializes the worker with the biller data and sets up the search service.
 * @param {object} payload - The initialization data.
 * @param {Array} payload.billers - The full array of biller objects.
 * @param {string} payload.fusePath - The path to the Fuse.js library.
 */
function initialize({ billers, fusePath }) {
  BILLERS = billers;
  let fuseLoaded = false;
  
  try {
    // importScripts() is the worker's equivalent of adding a <script> tag.
    if (fusePath) {
      importScripts(fusePath);
      fuseLoaded = true;
    }
  } catch (e) {
    console.warn('Fuse.js library not found at path. Falling back to basic search.', e);
  }

  if (fuseLoaded && typeof Fuse !== 'undefined') {
    // Initialize Fuse.js for high-quality fuzzy searching
    searchService = new Fuse(BILLERS, {
      keys: [{ name: 'tla', weight: 0.8 }, { name: 'name', weight: 0.6 }, { name: 'aliases', weight: 0.4 }],
      includeScore: true,
      threshold: 0.4,
      minMatchCharLength: 2,
    });
    console.log('Worker: Fuse.js search initialized.');
  } else {
    // Initialize a simple fallback search if Fuse.js is not available
    searchService = createFallbackSearch(BILLERS);
    console.log('Worker: Fallback search initialized.');
  }

  // Signal to the main thread that the worker is ready for queries.
  self.postMessage({ type: 'READY' });
}

/**
 * Performs a search and posts the results back to the main thread.
 * @param {string} query - The search term.
 */
function search(query) {
  if (!searchService || !query) {
    self.postMessage({ type: 'RESULTS', payload: [] });
    return;
  }

  const results = searchService.search(query);

  // IMPORTANT: Send back only the minimal data needed for the UI.
  // This reduces the cost of transferring data between threads.
  const minimalResults = results.slice(0, 50).map(result => {
    // Fuse.js wraps results in an "item" property.
    const item = result.item || result;
    return {
      id: item.id,
      name: item.name,
      tla: item.tla
    };
  });

  self.postMessage({ type: 'RESULTS', payload: minimalResults });
}

/**
 * Creates a simple search function for when Fuse.js is unavailable.
 * @param {Array} billers - The array of billers to search.
 * @returns {{search: function(string): Array}} An object with a search method.
 */
function createFallbackSearch(billers) {
  return {
    search: (query) => {
      const lowerQuery = query.toLowerCase();
      return billers.filter(b => 
        b.name.toLowerCase().includes(lowerQuery) || 
        b.tla.toLowerCase().includes(lowerQuery)
      );
    }
  };
}