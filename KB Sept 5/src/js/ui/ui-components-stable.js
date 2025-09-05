/**
 * UI COMPONENTS - STABLE & CONSOLIDATED
 * =====================================
 * This file defines and contains the UI logic for all stable, reusable
 * components and feature panels, such as Favorites, Settings, Modals,
 * Popovers, and Drawers.
 *
 * It is designed to be loaded after ui-core.js and appends its modules
 * to the global UI object.
 */

// Note: The global UI object is expected to be created in ui-core.js

UI.Theme = {
  apply(themeName) {
    // Replace any existing theme class
    document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
    
    // Add the new theme class
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

// --- FEATURE PANEL UI MODULES ---

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
          // Clicks on the name select the biller
          item.querySelector('.favorite-name').addEventListener('click', () => selectBillerById(billerId));
          // Clicks on the remove button toggle the favorite status
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

UI.Analytics = {
  chartInstance: null,
  renderChart(chartData) {
      // Fallback for when Chart.js CDN might fail or is not included
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
      // The full Chart.js configuration would be implemented here
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
      const isActive = index === activeIndex;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        dom.locationInput.setAttribute('aria-activedescendant', item.id);
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  },
  displayPersistentBillerList(locationData) {
      let billersHtml = `<div class="empty-state">No primary billers listed for this area.</div>`;
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

// --- GENERIC COMPONENT UI MODULES ---

UI.Popover = {
  toggle(popover, button) { 
      popover.hidden ? this.open(popover, button) : this.close(popover, button); 
  },
  open(popover, button) {
    popover.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    state.activePopover = { popover, button };
  },
  close(popover, button) {
    popover.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    state.activePopover = null;
  }
};

UI.Modal = {
  directoryVirtualList: null,
  open(modalElement) {
      state.activeModal = modalElement;
      modalElement.hidden = false; 
      modalElement.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Use VirtualList for performance with the full biller directory
      if (modalElement === dom.directoryModal && !this.directoryVirtualList && BILLERS && BILLERS.length > 0) {
          const sortedBillers = DataHelpers.sortBillersByName(BILLERS);
          this.directoryVirtualList = new VirtualList({
              container: dom.directoryModalList,
              items: sortedBillers,
              itemHeight: 46, // Height of a .directory-item
              renderItem: (biller) => `
                  <li class="directory-item" data-id="${biller.id}" role="button" tabindex="0">
                      <span class="status-dot ${biller.live ? 'is-live' : 'is-offline'}"></span>
                      <span class="directory-name">${biller.name}</span>
                      <span class="directory-tla">${biller.tla}</span>
                  </li>`
          });
          // After rendering, attach event listeners
          dom.directoryModalList.addEventListener('click', this.handleItemClick);
      }
  },
  close(modalElement) {
      if (modalElement === dom.directoryModal && this.directoryVirtualList) {
          this.directoryVirtualList.destroy();
          this.directoryVirtualList = null;
          dom.directoryModalList.removeEventListener('click', this.handleItemClick);
          dom.directoryModalList.innerHTML = ''; // Clear content
      }
      state.activeModal = null; 
      modalElement.classList.remove('is-open');
      document.body.style.overflow = '';
      
      // Delay hiding to allow for closing animation
      setTimeout(() => {
          if (!state.activeModal) modalElement.hidden = true;
      }, 300);
  },
  handleItemClick(e) {
      const item = e.target.closest('.directory-item');
      if (item && item.dataset.id) {
          selectBillerById(item.dataset.id);
          UI.Modal.close(dom.directoryModal);
      }
  }
};

UI.Drawer = {
  open(drawerElement) {
      this.lastFocused = document.activeElement; 
      state.activeDrawer = drawerElement;
      drawerElement.hidden = false;
      // Use requestAnimationFrame to ensure the transition is applied correctly
      requestAnimationFrame(() => {
          drawerElement.classList.add('is-open');
          const firstFocusable = drawerElement.querySelector('button, input, [href]');
          if (firstFocusable) firstFocusable.focus();
      });
  },
  close(drawerElement) {
      if (!drawerElement) return;
      drawerElement.classList.remove('is-open');
      if (this.lastFocused) this.lastFocused.focus();
      state.activeDrawer = null;
      // Delay hiding to allow for closing animation
      setTimeout(() => {
          if (!state.activeDrawer) drawerElement.hidden = true;
      }, 300);
  }
};

UI.Tools = {
    isLoaded: false,
    toggle() {
        // Lazy-load the drawer's content on first open
        if (!this.isLoaded) this.load();
        UI.Drawer.open(dom.toolsPanel);
    },
    load() {
        const templateContent = dom.toolsPanelTemplate.content.cloneNode(true);
        dom.toolsPanel.appendChild(templateContent);
        // Cache newly created DOM elements
        dom.toolsKbSearch = document.getElementById('toolsKbSearch');
        dom.kbList = document.getElementById('kbList');
        // Attach event listeners for the new elements
        dom.toolsPanel.querySelector('#toolsCloseBtn').addEventListener('click', () => UI.Drawer.close(dom.toolsPanel));
        dom.toolsKbSearch.addEventListener('input', Utils.debounce(Features.Tools.handleSearch, 200));
        this.isLoaded = true;
        Features.Tools.init(); // Initialize feature logic now that UI is ready
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