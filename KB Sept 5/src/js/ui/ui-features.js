/**
 * UI FEATURES
 * ==================
 * This file contains the UI logic for the application's major feature
 * panels, such as Favorites, Settings, Analytics, and Tools.
 *
 * It appends its modules to the global UI object, so it must be loaded
 * AFTER ui-core.js.
 */

UI.Favorites = {
  render(favoriteIds) {
    dom.favoritesList.innerHTML = '';
    if (favoriteIds.length === 0) {
      dom.favoritesList.innerHTML = `<li class="empty-state">Star a biller to add it here.</li>`;
      return;
    }
    const fragment = document.createDocumentFragment();
    favoriteIds.forEach(id => {
      const biller = DataHelpers.getBillerById(BILLERS, id);
      if (biller) {
        const item = document.createElement('li');
        item.className = 'favorite-item';
        item.dataset.id = biller.id;
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.innerHTML = `<span class="favorite-name">${biller.name}</span>
                          <button class="icon-btn icon-btn-remove" aria-label="Remove ${biller.name} from favorites"><i class="fa-solid fa-times"></i></button>`;
        fragment.appendChild(item);
      }
    });
    dom.favoritesList.appendChild(fragment);
    this.attachEventListeners();
  },
  attachEventListeners() {
      dom.favoritesList.querySelectorAll('.favorite-item').forEach(item => {
          const billerId = item.dataset.id;
          item.querySelector('.favorite-name').addEventListener('click', () => selectBillerById(billerId));
          item.querySelector('.icon-btn-remove').addEventListener('click', (e) => {
              e.stopPropagation();
              Features.Favorites.toggle(parseInt(billerId));
          });
      });
  },
  updateStar(isFavorite) {
    const starBtn = dom.billerCard.querySelector('#favoriteToggleBtn');
    if (starBtn) {
      starBtn.classList.toggle('is-favorite', isFavorite);
      const icon = starBtn.querySelector('i');
      icon.className = isFavorite ? 'fa-solid fa-star' : 'fa-regular fa-star';
    }
  },
  toggleVisibility() {
    dom.favoritesSection.classList.toggle('is-expanded');
  }
};

UI.Settings = {
  syncToggles(settings) {
    if (dom.toggleAreaZipUI) dom.toggleAreaZipUI.checked = settings.showAreaZipUI;
    if (dom.toggleSuggestions) dom.toggleSuggestions.checked = settings.suggestionsEnabled;
    if (dom.toggleCompactDensity) dom.toggleCompactDensity.checked = settings.compactDensity;
    if (dom.toggleAnalytics) dom.toggleAnalytics.checked = settings.showAnalytics;
    if (dom.toggleDebugLog) dom.toggleDebugLog.checked = settings.showDebugLog;
  },
  apply(settings) {
    if (settings.showAreaZipUI !== undefined && dom.areaZipLookup) {
      dom.areaZipLookup.hidden = !settings.showAreaZipUI;
    }
    if (settings.showAnalytics !== undefined && dom.analyticsDiv) {
      dom.analyticsDiv.hidden = !settings.showAnalytics;
    }
    if (settings.compactDensity !== undefined) {
      document.body.classList.toggle('density-compact', settings.compactDensity);
    }
    if (settings.showDebugLog !== undefined && dom.debugLog) {
      dom.debugLog.hidden = !settings.showDebugLog;
    }
  }
};

UI.Analytics = {
  chartInstance: null,
  renderChart(chartData) {
      if (typeof Chart === 'undefined') {
          const fallbackHtml = chartData.labels.length > 0
              ? chartData.labels.map((label, i) => `<div class="empty-state-item">${i + 1}. ${label} (${chartData.data[i]})</div>`).join('')
              : '<p class="empty-state">No viewing history yet.</p>';
          dom.analyticsDiv.innerHTML = `<h3 id="analytics-heading">Usage Analytics</h3><div class="empty-state-list">${fallbackHtml}</div>`;
          return;
      }
      if (this.chartInstance) this.chartInstance.destroy();
      const ctx = dom.analyticsChart?.getContext('2d');
      if (!ctx) return;
      // Chart.js config would go here...
  }
};

UI.Location = {
  clearSuggestions() {
    LocationFeature.currentSuggestions = [];
    LocationFeature.activeSuggestionIndex = -1;
    dom.locationSuggestionsList.innerHTML = '';
    dom.locationSuggestionsList.hidden = true;
    dom.locationInput.removeAttribute('aria-activedescendant');
  },
  renderSuggestions(suggestions) {
    dom.locationSuggestionsList.innerHTML = '';
    if (!suggestions || suggestions.length === 0) { 
      this.clearSuggestions(); 
      return; 
    }
    const fragment = document.createDocumentFragment();
    suggestions.slice(0, 5).forEach((suggestion, index) => {
      const item = document.createElement('li');
      item.className = 'suggestion-item';
      item.id = `location-suggestion-${index}`;
      item.setAttribute('role', 'option');
      item.dataset.code = suggestion.code;
      item.innerHTML = `<span>${suggestion.code}</span><span class="suggestion-tla">${suggestion.location}</span>`;
      fragment.appendChild(item);
    });
    dom.locationSuggestionsList.appendChild(fragment);
    dom.locationSuggestionsList.hidden = false;
    this.updateActiveSuggestion(0);
  },
  updateActiveSuggestion(activeIndex) {
    LocationFeature.activeSuggestionIndex = activeIndex;
    dom.locationSuggestionsList.querySelectorAll('.suggestion-item').forEach((item, index) => {
      if (index === activeIndex) {
        item.classList.add('is-active');
        item.setAttribute('aria-selected', 'true');
        dom.locationInput.setAttribute('aria-activedescendant', item.id);
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
      }
    });
  },
  displayPersistentBillerList(locationData) {
      let billersHtml = `<div class="empty-state">No primary billers listed.</div>`;
      if (locationData.billers.length > 0) {
          billersHtml = locationData.billers.map(biller => 
              `<li>
                  <button class="location-result-item" data-id="${biller.id}">
                      <strong>${biller.tla}</strong>
                      <span>${biller.name}</span>
                  </button>
              </li>`
          ).join('');
      }
      dom.locationResultsBox.innerHTML = `
          <h4 class="location-result-title">${locationData.name}</h4>
          <ul class="location-result-list">${billersHtml}</ul>
      `;
      dom.locationResultsBox.querySelectorAll('.location-result-item').forEach(button => {
          button.addEventListener('click', (e) => selectBillerById(e.currentTarget.dataset.id));
      });
      dom.locationResultsBox.hidden = false;
  }
};

UI.Theme = {
  apply(themeName) {
    document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
    if (!document.body.classList.contains(`theme-${themeName}`)) {
      document.body.classList.add(`theme-${themeName}`);
    }
    Utils.storageSet('biller-theme', themeName);
  },
  syncSelector(themeName) {
      if (!dom.themeSelector) return;
      const activeRadio = dom.themeSelector.querySelector(`input[value="${themeName}"]`);
      if (activeRadio) {
          activeRadio.checked = true;
      }
  }
};

UI.Tools = {
    isLoaded: false,
    toggle() {
        if (!this.isLoaded) this.load();
        UI.Drawer.open(dom.toolsPanel);
    },
    load() {
        const templateContent = dom.toolsPanelTemplate.content.cloneNode(true);
        dom.toolsPanel.appendChild(templateContent);
        dom.toolsKbSearch = document.getElementById('toolsKbSearch');
        dom.kbList = document.getElementById('kbList');
        dom.toolsPanel.querySelector('#toolsCloseBtn').addEventListener('click', () => UI.Drawer.close(dom.toolsPanel));
        dom.toolsKbSearch.addEventListener('input', Utils.debounce(Features.Tools.handleSearch, 200));
        this.isLoaded = true;
        Features.Tools.init();
    },
    renderKBArticles(articles) {
      if (!dom.kbList) return;
      dom.kbList.innerHTML = '';
      if (articles.length === 0) {
          dom.kbList.innerHTML = `<li class="empty-state">No articles found.</li>`;
          return;
      }
      const fragment = document.createDocumentFragment();
      articles.forEach(article => {
          const item = document.createElement('li');
          item.innerHTML = `<a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a>`;
          fragment.appendChild(item);
      });
      dom.kbList.appendChild(fragment);
    }
};