/**
 * APP UTILS
 * ==================
 * This file provides a set of globally available helper functions
 * through the `Utils` object for common tasks like local storage and debouncing.
 */
const Utils = {
  /**
   * Safely saves a value to localStorage after converting it to a JSON string.
   * @param {string} key The key to save the data under.
   * @param {*} value The value to save (can be an object, array, etc.).
   */
  storageSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  },

  /**
   * Safely retrieves and parses a value from localStorage.
   * @param {string} key The key of the data to retrieve.
   * @param {*} [defaultValue=null] The value to return if the key doesn't exist or data is corrupt.
   * @returns {*} The parsed value or the default value.
   */
  storageGet(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.error("Failed to retrieve from localStorage", e);
      return defaultValue;
    }
  },

  /**
   * Sets up event listeners to notify when the browser's online status changes.
   * @param {function(boolean): void} callback The function to call with the new status (true for online, false for offline).
   */
  onOfflineStatusChange(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
    callback(navigator.onLine);
  },

  /**
   * Finds the most frequent search term in history.
   * @param {Array<object>} history An array of past search history objects.
   * @returns {string|null} The most frequent TLA or null if no prediction can be made.
   */
  getMostFrequentSearch(history) {
    if (!history || history.length < 3) {
      return null;
    }
    const frequency = history.reduce((acc, item) => {
      if (item && item.tla) {
        acc[item.tla] = (acc[item.tla] || 0) + 1;
      }
      return acc;
    }, {});

    let maxCount = 0;
    let prediction = null;

    for (const term in frequency) {
      if (frequency[term] > maxCount) {
        maxCount = frequency[term];
        prediction = term;
      }
    }

    if (prediction === history[history.length - 1]?.tla) {
      return null;
    }

    return prediction;
  },
  
  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was invoked.
   * @param {function} func The function to debounce.
   * @param {number} wait The number of milliseconds to delay.
   * @returns {function} The new debounced function.
   */
  debounce(func, wait = 200) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },

  /**
   * Appends a message to an on-screen debug log for troubleshooting.
   * @param {string} message The message to log.
   */
  debugLog(message) {
    // This function relies on an element with id="debugLog" in index.html
    const logContainer = document.getElementById('debugLog');
    if (!logContainer) return;

    const timestamp = new Date().toLocaleTimeString();
    const entry = document.createElement('p');
    entry.textContent = `[${timestamp}] ${message}`;
    
    logContainer.appendChild(entry);
    // Auto-scroll to the latest message
    logContainer.scrollTop = logContainer.scrollHeight;
  }
};
