/**
 * DATABASE MODULE (IndexedDB Wrapper)
 * ==================
 * UPDATED: Added a deleteDatabase function to completely remove the
 * database, allowing for a full application cache reset.
 *
 * This file provides a simple promise-based interface for interacting
 * with IndexedDB, abstracting away its verbosity.
 */

const DB = {
  DB_NAME: 'BillerHubDB',
  DB_VERSION: 1,
  STORE_NAME: 'keyval',
  _dbPromise: null,

  /**
   * Deletes the entire IndexedDB database for this application.
   * Ensures any open connection is closed first.
   * @returns {Promise<void>} A promise that resolves when the database is successfully deleted.
   */
  deleteDatabase() {
    return new Promise((resolve, reject) => {
      // Ensure any existing connection is closed before trying to delete
      if (this._dbPromise) {
        this._dbPromise.then(db => {
          db.close();
          this._dbPromise = null; // Clear the promise
          console.log('Database connection closed for deletion.');
          _delete();
        });
      } else {
        _delete();
      }

      const _delete = () => {
        console.log(`Requesting deletion of database: ${this.DB_NAME}`);
        const deleteRequest = indexedDB.deleteDatabase(this.DB_NAME);

        deleteRequest.onsuccess = () => {
          console.log('Database deleted successfully.');
          resolve();
        };

        deleteRequest.onerror = (event) => {
          console.error('Error deleting database:', event.target.error);
          reject(event.target.error);
        };
        
        deleteRequest.onblocked = () => {
            console.warn('Database deletion is blocked. Please close other tabs with this app open.');
            reject('Database deletion blocked.');
        }
      };
    });
  },

  /**
   * Opens and initializes the database connection.
   * This is called internally and memoizes the promise.
   * @returns {Promise<IDBDatabase>} A promise that resolves with the database instance.
   */
  _connect() {
    if (this._dbPromise) {
      return this._dbPromise;
    }

    this._dbPromise = new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        console.warn('IndexedDB not supported.');
        return reject('IndexedDB not supported.');
      }

      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME);
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Database error:', event.target.error);
        reject(event.target.error);
      };
    });

    return this._dbPromise;
  },

  /**
   * Retrieves a value from the database by its key.
   * @param {string} key - The key of the item to retrieve.
   * @returns {Promise<any>} A promise that resolves with the value, or undefined if not found.
   */
  get(key) {
    return this._connect().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readonly');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.get(key);

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (event) => {
          console.error(`Error getting key "${key}":`, event.target.error);
          reject(event.target.error);
        };
      });
    });
  },

  /**
   * Saves a value in the database with a given key.
   * @param {string} key - The key to save the item under.
   * @param {any} value - The value to save.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  set(key, value) {
    return this._connect().then(db => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.put(value, key);

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = (event) => {
          console.error(`Error setting key "${key}":`, event.target.error);
          reject(event.target.error);
        };
      });
    });
  }
};