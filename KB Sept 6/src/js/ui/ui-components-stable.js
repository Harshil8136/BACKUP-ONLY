/**
 * UI COMPONENTS - STABLE & CONSOLIDATED
 * =====================================
 * This file defines and contains the UI logic for all stable, reusable
 * components and feature panels, such as Favorites, Settings, Modals,
 * and Drawers.
 *
 * It is designed to be loaded after ui-core.js and appends its modules
 * to the global UI object.
 */

// Note: The global UI object is expected to be created in ui-core.js

UI.Favorites = {
  render(favoriteIds) {
    if (!dom.favoritesList) return;
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
      if (!dom.favoritesList) return;
      dom.favoritesList.querySelectorAll('.favorite-item').forEach(item => {
          const billerId = item.dataset.id;
          item.querySelector('.favorite-name').addEventListener('click', () => {
            selectBillerById(billerId);
            UI.Popovers.closeActive(); // Close popover on selection
          });
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
  }
};

UI.Analytics = {
  chartInstance: null,
  renderChart(chartData) {
      if (!dom.analyticsDiv) return;
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
  displayResults(locationData) {
    if (!dom.areaLookupResultsBox) return;
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
    dom.areaLookupResultsBox.innerHTML = `
        <h4 class="location-result-title">${locationData.name}</h4>
        <ul class="location-result-list">${billersHtml}</ul>
    `;
    dom.areaLookupResultsBox.querySelectorAll('.location-result-item').forEach(button => {
        button.addEventListener('click', (e) => {
            selectBillerById(e.currentTarget.dataset.id);
            UI.Popovers.closeActive(); // Close popover on selection
        });
    });
    dom.areaLookupResultsBox.hidden = false;
  },
  clearResults() {
    if (dom.areaLookupResultsBox) {
        dom.areaLookupResultsBox.innerHTML = '';
        dom.areaLookupResultsBox.hidden = true;
    }
  },
  displayNoResults(query) {
    if (!dom.areaLookupResultsBox) return;
    dom.areaLookupResultsBox.innerHTML = `<div class="empty-state">No location found for area code "${query}".</div>`;
    dom.areaLookupResultsBox.hidden = false;
  }
};

UI.Settings = {
  syncToggles(settings) {
    // This function will be expanded as more toggles are added back.
    const toggles = {
        'toggleSuggestions': settings.suggestionsEnabled,
        'toggleCompactDensity': settings.compactDensity,
        'toggleAnalytics': settings.showAnalytics,
        'toggleDebugLog': settings.showDebugLog,
    };
    for (const id in toggles) {
        const el = document.getElementById(id);
        if (el) el.checked = toggles[id];
    }
  },
  apply(settings) {
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

UI.Modal = {
  directoryVirtualList: null,
  open(modalElement) {
      state.activeModal = modalElement;
      modalElement.hidden = false; 
      requestAnimationFrame(() => {
          modalElement.classList.add('is-open');
          document.body.style.overflow = 'hidden';
      });

      if (modalElement === dom.directoryModal && !this.directoryVirtualList && BILLERS && BILLERS.length > 0) {
          const sortedBillers = DataHelpers.sortBillersByName(BILLERS);
          const modalBody = modalElement.querySelector('.modal-body');
          this.directoryVirtualList = new VirtualList({
              container: modalBody,
              items: sortedBillers,
              itemHeight: 46,
              renderItem: (biller) => `
                  <li class="directory-item" data-id="${biller.id}" role="button" tabindex="0">
                      <span class="status-dot ${biller.live ? 'is-live' : 'is-offline'}"></span>
                      <span class="directory-name">${biller.name}</span>
                      <span class="directory-tla">${biller.tla}</span>
                  </li>`
          });
          modalBody.addEventListener('click', this.handleItemClick);
      }
  },
  close(modalElement) {
      const modalBody = modalElement.querySelector('.modal-body');
      if (modalElement === dom.directoryModal && this.directoryVirtualList) {
          this.directoryVirtualList.destroy();
          this.directoryVirtualList = null;
          modalBody.removeEventListener('click', this.handleItemClick);
          modalBody.innerHTML = '';
      }
      state.activeModal = null; 
      modalElement.classList.remove('is-open');
      document.body.style.overflow = '';
      
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
      state.activeDrawer = drawerElement;
      drawerElement.hidden = false;
      requestAnimationFrame(() => {
          drawerElement.classList.add('is-open');
          const firstFocusable = drawerElement.querySelector('button, input, [href]');
          if (firstFocusable) firstFocusable.focus();
      });
  },
  close(drawerElement) {
      if (!drawerElement) return;
      state.activeDrawer = null;
      drawerElement.classList.remove('is-open');
      setTimeout(() => {
          if (!state.activeDrawer) drawerElement.hidden = true;
      }, 300);
  }
};

UI.Tools = {
    isLoaded: false,
    toggle() {
        if (!this.isLoaded) this.load();
        UI.Drawer.open(dom.toolsPanel);
    },
    load() {
        if (this.isLoaded || !dom.toolsPanelTemplate) return;
        const templateContent = dom.toolsPanelTemplate.content.cloneNode(true);
        dom.toolsPanel.appendChild(templateContent);
        dom.toolsPanel.querySelector('#toolsCloseBtn')?.addEventListener('click', () => UI.Drawer.close(dom.toolsPanel));
        document.getElementById('toolsKbSearch')?.addEventListener('input', Utils.debounce(Features.Tools.handleSearch, 200));
        this.isLoaded = true;
        Features.Tools.init();
    },
    renderKBArticles(articles) {
      const kbList = document.getElementById('kbList');
      if (!kbList) return;
      kbList.innerHTML = '';
      if (articles.length === 0) {
          kbList.innerHTML = `<li class="empty-state">No articles found.</li>`;
          return;
      }
      const fragment = document.createDocumentFragment();
      articles.forEach(article => {
          const item = document.createElement('li');
          item.innerHTML = `<a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a>`;
          fragment.appendChild(item);
      });
      kbList.appendChild(fragment);
    }
};