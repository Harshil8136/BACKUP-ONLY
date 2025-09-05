/**
 * APP UTILS
 * ==================
 * This is the definitive version for the file:// compatible architecture.
 * It provides a set of globally available helper functions for common tasks,
 * including new helpers for performance management like the FrameUpdater.
 */
const Utils = {
  /**
   * Safely saves a value to localStorage after converting it to a JSON string.
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
   */
  onOfflineStatusChange(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
    callback(navigator.onLine);
  },
  
  /**
   * Creates a debounced function that delays invoking `func`.
   */
  debounce(func, wait = 200) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },

  // --- NEW PERFORMANCE HELPERS ---

  /**
   * A simple frame task queue to batch DOM writes into a single
   * requestAnimationFrame callback, preventing layout thrash.
   */
  FrameUpdater: {
    writeQueue: [],
    isScheduled: false,
    schedule(callback) {
      this.writeQueue.push(callback);
      if (!this.isScheduled) {
        this.isScheduled = true;
        requestAnimationFrame(() => {
          this.writeQueue.forEach(cb => cb());
          this.writeQueue = [];
          this.isScheduled = false;
        });
      }
    }
  },

  /**
   * Checks if the user has requested reduced motion.
   * @returns {boolean} True if reduced motion is preferred.
   */
  prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Runs a task during the browser's idle time to avoid blocking
   * critical rendering or user interactions.
   * @param {Function} callback The function to execute when the browser is idle.
   */
  runWhenIdle(callback) {
      if ('requestIdleCallback' in window) {
          requestIdleCallback(callback, { timeout: 2000 });
      } else {
          setTimeout(callback, 300); // Fallback for older browsers
      }
  }
};