/**
 * UI CORE
 * ==================
 * This is the definitive version for the file:// compatible architecture.
 * It creates the main UI object and contains the core rendering engine,
 * now upgraded with performance features like batched DOM writes and
 * the View Transitions API.
 */

const UI = {
  suggestionsVirtualList: null,

  displayBiller: function(biller) {
    if (!biller) {
      Utils.FrameUpdater.schedule(() => {
        dom.billerCard.hidden = true;
      });
      return;
    }

    // This function contains the logic to update the DOM.
    const updateDOM = () => {
      // Helper functions to generate HTML parts
      const createActionButton = (url, text, icon, type) => {
        if (!url) return '';
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn-biller-card btn-${type}"><i class="fa-solid ${icon}"></i> ${text}</a>`;
      };

      const createContactField = (contact) => {
        const { type, label, value, note } = contact;
        if (!value) return '';
        let labelHtml = `<strong>${label}</strong>`;
        if (type === 'Internal') {
          labelHtml = `<strong>${label} <span class="internal-badge">Internal Use</span></strong>`;
        }
        let valueHtml = '';
        let itemClass = 'quick-link-item';
        if (value.toLowerCase().includes('see notes') || value.toLowerCase().includes('refer to kb')) {
          itemClass += ' non-copyable';
          valueHtml = `<span>${value}</span>`;
        } else {
          valueHtml = `<div class="copyable-field compact">
                         <span>${value}</span>
                         <button class="icon-btn icon-btn-copy" aria-label="Copy ${label}"><i class="fa-solid fa-copy"></i></button>
                       </div>`;
        }
        const noteHtml = note ? `<small class="contact-note-danger">${note}</small>` : '';
        return `<div class="${itemClass}">${labelHtml}${valueHtml}${noteHtml}</div>`;
      };

      // Generate dynamic content
      const contactsHtml = (biller.contacts && biller.contacts.length > 0) ?
        biller.contacts.map(createContactField).join('') : '';

      const customFieldsHtml = (biller.customFields && biller.customFields.length > 0) ?
        `<div class="notes-section"><h3>Additional Information</h3><div class="notes-content color-border-secondary"><ul>${biller.customFields.map(field => `<li><strong>${field.label}:</strong> ${field.value}</li>`).join('')}</ul></div></div>` : '';

      const paymentTypeHtml = (biller.paymentTypes && biller.paymentTypes.length > 0) ?
        `<span class="payment-type-tag">${biller.paymentTypes.join(', ')}</span>` : '';

      // Build the content on a DocumentFragment for efficient rendering
      const fragment = document.createDocumentFragment();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `
          <div class="card-header">
            <div class="card-title-group" data-biller-id="${biller.id}">
              <h2 class="card-title">${biller.name} (${biller.tla})</h2>
              <button id="favoriteToggleBtn" class="icon-btn icon-btn-favorite" aria-label="Toggle Favorite"><i class="fa-regular fa-star"></i></button>
            </div>
            <div class="card-header-meta">${paymentTypeHtml}<span class="card-status ${biller.live ? 'is-live' : 'is-offline'}">${biller.live ? 'Live' : 'Non-Live'}</span></div>
          </div>
          <div class="biller-action-bar">
            <div class="action-bar-buttons">${createActionButton(biller.kbLink, 'Knowledge Base', 'fa-book', 'kb')}${createActionButton(biller.adLink, 'Agent Dashboard', 'fa-server', 'ad')}</div>
            <div class="action-bar-contacts">${contactsHtml}</div>
          </div>
          <div class="card-grid"><div id="interactiveNotesContainer"></div>${customFieldsHtml}</div>
        `;
      fragment.append(...tempDiv.children);

      // Perform the single DOM write operation
      dom.billerCard.innerHTML = '';
      dom.billerCard.appendChild(fragment);
      dom.locationCard.hidden = true;
      dom.billerCard.hidden = false;

      // Update related components
      NotesFeature.loadNotesForBiller(biller);
      UI.Favorites.updateStar(Features.Favorites.isFavorite(biller.id));
    };

    // Use the View Transitions API if available, otherwise update directly.
    // Both paths use the FrameUpdater to batch the DOM writes.
    if (document.startViewTransition && !Utils.prefersReducedMotion()) {
      document.startViewTransition(() => Utils.FrameUpdater.schedule(updateDOM));
    } else {
      Utils.FrameUpdater.schedule(updateDOM);
    }
  },

  renderSuggestions: function(suggestions, query) {
    this.clearSuggestions();
    if (!suggestions || suggestions.length === 0) return;

    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');

    // Always use VirtualList for consistent performance
    this.suggestionsVirtualList = new VirtualList({
      container: dom.suggestionsList,
      items: suggestions,
      itemHeight: 44,
      renderItem: (biller) => {
        const highlightedName = biller.name.replace(queryRegex, `<strong>$1</strong>`);
        return `<li class="suggestion-item" role="option" data-id="${biller.id}"><span>${highlightedName}</span><span class="suggestion-tla">${biller.tla}</span></li>`;
      }
    });

    Utils.FrameUpdater.schedule(() => {
      dom.suggestionsList.hidden = false;
      dom.searchWrapper.setAttribute('aria-expanded', 'true');
      state.activeSuggestionIndex = -1;
    });
  },

  clearSuggestions: function() {
    if (this.suggestionsVirtualList) {
      this.suggestionsVirtualList.destroy();
      this.suggestionsVirtualList = null;
    }
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
    Utils.FrameUpdater.schedule(() => {
      dom.suggestionsList.innerHTML = '';
      dom.suggestionsList.hidden = true;
      dom.searchWrapper.setAttribute('aria-expanded', 'false');
      dom.searchInput.removeAttribute('aria-activedescendant');
    });
  },

  updateActiveSuggestion: function() {
    // First, read all the required information from the DOM.
    const itemsToUpdate = [];
    dom.suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
      const itemId = item.dataset.id;
      const fullListIndex = state.currentSuggestions.findIndex(b => b.id == itemId);
      itemsToUpdate.push({
        element: item,
        isActive: fullListIndex === state.activeSuggestionIndex
      });
    });

    // Then, schedule a single batched DOM write to update all elements at once.
    Utils.FrameUpdater.schedule(() => {
      itemsToUpdate.forEach(({ element, isActive }) => {
        element.classList.toggle('is-active', isActive);
        if (isActive) dom.searchInput.setAttribute('aria-activedescendant', element.id);
      });
    });
  },

  showNotification: function(message, type = 'info') {
    Utils.FrameUpdater.schedule(() => {
      dom.notificationBanner.textContent = message;
      dom.notificationBanner.className = `notification-banner is-${type}`;
      dom.notificationBanner.hidden = false;
    });
    setTimeout(() => {
      Utils.FrameUpdater.schedule(() => {
        dom.notificationBanner.hidden = true;
      });
    }, 4000);
  },

  updateOfflineIndicator: function(isOnline) {
    if (!isOnline) {
      this.showNotification('You are currently offline. Some features may be limited.', 'error');
    } else {
      if (!dom.notificationBanner.hidden) {
        this.showNotification('You are back online!', 'success');
      }
    }
  },
};