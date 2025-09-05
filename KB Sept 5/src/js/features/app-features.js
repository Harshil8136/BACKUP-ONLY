/**
 * APP FEATURES
 * ==================
 * UPDATED: A new "System" module has been added to handle application-level
 * actions like the cache reset.
 *
 * This file contains the logic for the application's major features,
 * including Favorites, Settings, Analytics, Tools, and the new Theme manager.
 */

const Features = {

  // --- THEME MODULE ---
  Theme: {
    init() {
      // Apply the saved theme on startup
      const savedTheme = Utils.storageGet('biller-theme', 'light');
      UI.Theme.apply(savedTheme);
      UI.Theme.syncSelector(savedTheme);

      // Listen for changes on the theme selector
      dom.themeSelector.addEventListener('change', this.handleChange);
    },
    handleChange(event) {
      const selectedTheme = event.target.value;
      UI.Theme.apply(selectedTheme);
    }
  },

  // --- FAVORITES MODULE ---
  Favorites: {
    list: [],
    init() {
      this.list = Utils.storageGet('biller-favorites', []);
      UI.Favorites.render(this.list);
    },
    toggle(billerId) {
      let isFavorite = false;
      if (this.list.includes(billerId)) {
        this.list = this.list.filter(id => id !== billerId);
      } else {
        this.list.push(billerId);
        isFavorite = true;
      }
      Utils.storageSet('biller-favorites', this.list);
      UI.Favorites.render(this.list);
      const displayedBillerId = dom.billerCard.querySelector('.card-title-group')?.dataset.billerId;
      if (displayedBillerId == billerId) {
          UI.Favorites.updateStar(isFavorite);
      }
      return isFavorite;
    },
    isFavorite(billerId) {
      return this.list.includes(billerId);
    }
  },

  // --- SETTINGS MODULE ---
  Settings: {
    init() {
      const settings = {
        showAreaZipUI: Utils.storageGet('biller-setting-showAreaZipUI', false),
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
        case 'toggleAreaZipUI':
          settingKey = 'biller-setting-showAreaZipUI';
          state.settings.showAreaZipUI = isChecked;
          UI.Settings.apply({ showAreaZipUI: isChecked });
          break;
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

  // --- ANALYTICS MODULE ---
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
  
  // --- TOOLS MODULE ---
  Tools: {
    init() {
        UI.Tools.renderKBArticles(KB_ARTICLES);
    },
    handleSearch() {
        const query = dom.toolsKbSearch.value.toLowerCase().trim();
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

  // --- SYSTEM MODULE ---
  System: {
    async resetApplication() {
      const confirmed = confirm(
        "Are you sure you want to reset the application?\n\nThis will clear all cached data, favorites, and settings, and then reload the page."
      );

      if (confirmed) {
        try {
          Utils.debugLog('Resetting application...');
          UI.showNotification('Resetting application...', 'info');
          
          // Clear all databases and stored data
          await DB.deleteDatabase();
          localStorage.clear();

          // Force a reload from the server
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