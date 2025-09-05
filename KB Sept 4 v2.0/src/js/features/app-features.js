/**
 * APP FEATURES
 * ==================
 * This is the definitive version for the file:// compatible architecture.
 * It contains the non-UI logic for the application's major features.
 */

const Features = {
  Theme: {
    init() {
      const savedTheme = Utils.storageGet('biller-theme', 'light');
      UI.Theme.apply(savedTheme);
      UI.Theme.syncSelector(savedTheme);
    },
    handleChange(event) {
      const selectedTheme = event.target.value;
      UI.Theme.apply(selectedTheme);
    }
  },

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
      
      Utils.runWhenIdle(() => {
        Utils.storageSet('biller-favorites', this.list);
      });
      
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

  Settings: {
    init() {
      const settings = {
        showAreaZipUI: Utils.storageGet('biller-setting-showAreaZipUI', false),
        suggestionsEnabled: Utils.storageGet('biller-setting-suggestionsEnabled', true),
        compactDensity: Utils.storageGet('biller-setting-compactDensity', false),
        showAnalytics: Utils.storageGet('biller-setting-showAnalytics', true),
        showInPageConsole: Utils.storageGet('biller-setting-showConsole', true),
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
          break;
        case 'toggleSuggestions':
          settingKey = 'biller-setting-suggestionsEnabled';
          state.settings.suggestionsEnabled = isChecked;
          if (!isChecked) UI.clearSuggestions();
          break;
        case 'toggleCompactDensity':
          settingKey = 'biller-setting-compactDensity';
          state.settings.compactDensity = isChecked;
          break;
        case 'toggleAnalytics':
          settingKey = 'biller-setting-showAnalytics';
          state.settings.showAnalytics = isChecked;
          break;
        case 'toggleInPageConsole':
          settingKey = 'biller-setting-showConsole';
          state.settings.showInPageConsole = isChecked;
          if (window.InPageConsole) {
            isChecked ? window.InPageConsole.show() : window.InPageConsole.hide();
          }
          break;
      }
      
      UI.Settings.apply(state.settings);

      if (settingKey) {
        Utils.runWhenIdle(() => {
            Utils.storageSet(settingKey, isChecked);
        });
      }
    }
  },

  Analytics: {
    init() { 
      this.updateChart(); 
    },
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
      
      Utils.runWhenIdle(() => {
        Utils.storageSet('biller-searchHistory', state.searchHistory);
      });

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

  System: {
    resetApplication() {
      const confirmed = confirm(
        "Are you sure you want to reset the application?\n\nThis will clear all local data (favorites, settings) and reload the page."
      );

      if (confirmed) {
        try {
          console.log('Resetting application...');
          localStorage.clear();
          location.reload(true);
        } catch (error) {
          console.error('Failed to reset application:', error);
          alert('An error occurred during reset. You may need to close and reopen the file.');
        }
      }
    }
  }
};