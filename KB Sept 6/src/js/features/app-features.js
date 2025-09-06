/**
 * APP FEATURES
 * ==================
 * This file contains the logic for the application's major features.
 *
 * UPDATED: 'FontSize' module now applies a multiplier for scoped font scaling.
 * The 'Theme' module has been removed, its logic now lives in 'theme-feature.js'.
 */

const Features = {

  Favorites: {
    list: [],
    init() {
      this.list = Utils.storageGet('biller-favorites', []);
    },
    toggle(billerId) {
      let isFavorite = false;
      const billerIdInt = parseInt(billerId);

      if (this.list.includes(billerIdInt)) {
        this.list = this.list.filter(id => id !== billerIdInt);
      } else {
        this.list.push(billerIdInt);
        isFavorite = true;
      }
      Utils.storageSet('biller-favorites', this.list);
      
      const displayedBillerId = dom.billerCard.querySelector('.card-title-group')?.dataset.billerId;
      if (displayedBillerId == billerId) {
          UI.Favorites.updateStar(isFavorite);
      }

      if (state.activePopover && state.activePopover.popover === dom.favoritesPopover) {
          UI.Favorites.render(this.list);
      }
      
      return isFavorite;
    },
    isFavorite(billerId) {
      return this.list.includes(parseInt(billerId));
    }
  },

  Settings: {
    init() {
      const settings = {
        suggestionsEnabled: Utils.storageGet('biller-setting-suggestionsEnabled', true),
        compactDensity: Utils.storageGet('biller-setting-compactDensity', false),
        showAnalytics: Utils.storageGet('biller-setting-showAnalytics', true),
        showDebugLog: Utils.storageGet('biller-setting-showDebugLog', false),
      };
      state.settings = settings;
      UI.Settings.syncToggles(settings);
      UI.Settings.apply(settings);
    },
    handleToggle(e) {
      const settingId = e.target.id;
      const isChecked = e.target.checked;
      let settingKey;
      switch (settingId) {
        case 'toggleSuggestions':
          settingKey = 'biller-setting-suggestionsEnabled';
          state.settings.suggestionsEnabled = isChecked;
          if (!isChecked) UI.clearSuggestions();
          break;
        case 'toggleCompactDensity':
          settingKey = 'biller-setting-compactDensity';
          state.settings.compactDensity = isChecked;
          UI.Settings.apply({ compactDensity: isChecked });
          break;
        case 'toggleAnalytics':
          settingKey = 'biller-setting-showAnalytics';
          state.settings.showAnalytics = isChecked;
          UI.Settings.apply({ showAnalytics: isChecked });
          break;
        case 'toggleDebugLog':
          settingKey = 'biller-setting-showDebugLog';
          state.settings.showDebugLog = isChecked;
          UI.Settings.apply({ showDebugLog: isChecked });
          break;
      }
      if (settingKey) Utils.storageSet(settingKey, isChecked);
    }
  },

  FontSize: {
    // Configuration for font sizes (in pixels)
    BASE_SIZE: 16,
    MIN_SIZE: 12,
    MAX_SIZE: 20,
    STEP: 1,
    currentSize: 16,

    init() {
      this.currentSize = Utils.storageGet('biller-fontSize', this.BASE_SIZE);
      this.apply(this.currentSize);
    },
    increase() {
      const newSize = Math.min(this.currentSize + this.STEP, this.MAX_SIZE);
      this.apply(newSize);
    },
    decrease() {
      const newSize = Math.max(this.currentSize - this.STEP, this.MIN_SIZE);
      this.apply(newSize);
    },
    apply(size) {
      // Calculate a multiplier based on the desired size and the base size.
      const multiplier = size / this.BASE_SIZE; // e.g., 18px / 16px = 1.125
      // Set a CSS custom property on the body.
      document.body.style.setProperty('--biller-font-size-multiplier', multiplier);
      
      this.currentSize = size;
      Utils.storageSet('biller-fontSize', size);
    }
  },

  Analytics: {
    init() { this.updateChart(); },
    logBillerView(biller) {
      const maxHistory = 50;
      state.searchHistory.push({
          id: biller.id, 
          tla: biller.tla,
          timestamp: Date.now() 
      });
      if (state.searchHistory.length > maxHistory) {
        state.searchHistory.shift();
      }
      Utils.storageSet('biller-searchHistory', state.searchHistory);
      this.updateChart();
    },
    updateChart() {
      const chartData = DataHelpers.processSearchHistoryForChart(state.searchHistory, 5);
      UI.Analytics.renderChart(chartData);
    }
  },
  
  Tools: {
    init() {
      UI.Tools.renderKBArticles(KB_ARTICLES);
    },
    handleSearch(e) {
      const query = e.target.value.toLowerCase().trim();
      if (typeof KB_ARTICLES === 'undefined') return;

      if (!query) {
          UI.Tools.renderKBArticles(KB_ARTICLES);
          return;
      }
      
      const filteredArticles = KB_ARTICLES.filter(article => 
          article.title.toLowerCase().includes(query)
      );
      
      UI.Tools.renderKBArticles(filteredArticles);
    }
  },

  System: {
    async resetApplication() {
      const confirmed = confirm(
        "Are you sure you want to reset the application?\n\nThis will clear all cached data, favorites, and settings, and then reload the page."
      );

      if (confirmed) {
        try {
          Utils.debugLog('Resetting application...');
          UI.showNotification('Resetting application...', 'info');
          
          await DB.deleteDatabase();
          localStorage.clear();

          location.reload(true);
        } catch (error) {
          console.error('Failed to reset application:', error);
          Utils.debugLog(`ERROR: Application reset failed: ${error}`);
          UI.showNotification('An error occurred during reset. Please clear browser data manually.', 'error');
        }
      }
    }
  }
};