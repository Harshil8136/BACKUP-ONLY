/**
 * DATA HELPERS
 * ==================
 * This file provides a set of globally available helper functions for
 * querying and manipulating the application's data (e.g., the BILLERS array).
 */

const DataHelpers = {
  /**
   * Finds a single biller from an array of billers by its unique ID.
   * @param {Array} billers The array of biller objects to search.
   * @param {number|string} id The unique ID of the biller to find.
   * @returns {object|undefined} The found biller object, or undefined if not found.
   */
  getBillerById(billers, id) {
    if (!billers) return undefined;
    // Using == allows for loose comparison as ID from dataset might be a string.
    return billers.find(biller => biller.id == id);
  },

  /**
   * Sorts an array of billers alphabetically by name.
   * @param {Array} billers The array of biller objects to sort.
   * @returns {Array} A new, sorted array of billers.
   */
  sortBillersByName(billers) {
    if (!billers) return [];
    // Create a new array to avoid modifying the original
    return [...billers].sort((a, b) => a.name.localeCompare(b.name));
  },

  /**
   * Processes a raw search history array to find the most frequent searches,
   * returning data formatted for a Chart.js bar chart.
   * UPDATED: Added validation to safely handle potentially corrupt history data.
   * @param {Array<object>} history An array of biller objects that were viewed ({id, tla}).
   * @param {number} [limit=5] The number of top results to return.
   * @returns {{labels: string[], data: number[]}} An object containing labels and data for a chart.
   */
  processSearchHistoryForChart(history, limit = 5) {
    if (!history || history.length === 0) {
      return { labels: [], data: [] };
    }

    // Count the frequency of each biller view by its ID
    const frequency = history.reduce((acc, item) => {
      // Validation check to prevent errors from malformed history items
      if (item && item.id && item.tla) {
        acc[item.id] = {
            count: (acc[item.id]?.count || 0) + 1,
            tla: item.tla
        };
      }
      return acc;
    }, {});
    
    // Sort by frequency in descending order
    const sorted = Object.keys(frequency).sort((a, b) => frequency[b].count - frequency[a].count);

    // Get the top 'limit' billers and format for Chart.js
    const topBillerIds = sorted.slice(0, limit);
    const labels = [];
    const data = [];

    topBillerIds.forEach(id => {
      const item = frequency[id];
      if (item) {
        labels.push(item.tla); // Use TLA for concise chart labels
        data.push(item.count);
      }
    });

    return { labels, data };
  },
};