/**
 * UI CORE
 * ==================
 * This file contains the core rendering engine for the application. It is
 * responsible for creating the main UI object and handling the most critical
 * and frequently changing UI updates, like displaying the main biller card.
 */

const UI = {
  suggestionsVirtualList: null,

  displayBiller: function(biller) {
    if (!biller) {
      dom.billerCard.hidden = true;
      return;
    }
    dom.locationCard.hidden = true;
    if (dom.areaLookupResultsBox) {
        dom.areaLookupResultsBox.hidden = true;
    }

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

      return `<div class="${itemClass}">
                  ${labelHtml}
                  ${valueHtml}
                  ${noteHtml}
              </div>`;
    };

    let contactsHtml = '';
    if (biller.contacts && biller.contacts.length > 0) {
        contactsHtml = biller.contacts.map(contact => createContactField(contact)).join('');
    }

    let customFieldsHtml = '';
    if (biller.customFields && biller.customFields.length > 0) {
        const fieldsList = biller.customFields.map(field => {
            // Check if the value is a link to make it clickable
            if (field.value && (field.value.startsWith('http') || field.value.startsWith('www'))) {
                return `<li><strong>${field.label}:</strong> <a href="${field.value}" target="_blank" rel="noopener noreferrer">${field.value}</a></li>`;
            }
            return `<li><strong>${field.label}:</strong> ${field.value}</li>`;
        }).join('');
        customFieldsHtml = `
          <div class="notes-section">
            <h3>Additional Information</h3>
            <div class="notes-content color-border-secondary">
              <ul>${fieldsList}</ul>
            </div>
          </div>
        `;
    }

    const paymentTypeHtml = biller.paymentTypes && biller.paymentTypes.length > 0
      ? `<span class="payment-type-tag">${biller.paymentTypes.join(', ')}</span>`
      : '';

    dom.billerCard.innerHTML = `
      <div class="card-header">
        <div class="card-title-group" data-biller-id="${biller.id}">
          <h2 class="card-title">${biller.name} (${biller.tla})</h2>
          <button id="favoriteToggleBtn" class="icon-btn icon-btn-favorite" aria-label="Toggle Favorite">
            <i class="fa-regular fa-star"></i>
          </button>
        </div>
        <div class="card-header-meta">
            ${paymentTypeHtml}
            <span class="card-status ${biller.live ? 'is-live' : 'is-offline'}">${biller.live ? 'Live' : 'Non-Live'}</span>
        </div>
      </div>
      <div class="biller-action-bar">
        <div class="action-bar-buttons">
          ${createActionButton(biller.kbLink, 'Knowledge Base', 'fa-book', 'kb')}
          ${createActionButton(biller.adLink, 'Agent Dashboard', 'fa-server', 'ad')}
        </div>
        <div class="action-bar-contacts">
          ${contactsHtml}
        </div>
      </div>
      <div class="card-grid">
        <div id="interactiveNotesContainer"></div>
        ${customFieldsHtml}
      </div>`;

    dom.billerCard.querySelectorAll('.icon-btn-copy, #favoriteToggleBtn').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentTarget = e.currentTarget;
            if (currentTarget.classList.contains('icon-btn-copy')) {
                const textToCopy = currentTarget.previousElementSibling.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const icon = currentTarget.querySelector('i');
                    icon.classList.replace('fa-copy', 'fa-check');
                    currentTarget.classList.add('is-copied');
                    setTimeout(() => {
                        icon.classList.replace('fa-check', 'fa-copy');
                        currentTarget.classList.remove('is-copied');
                    }, 1500);
                });
            } else if (currentTarget.id === 'favoriteToggleBtn') {
                Features.Favorites.toggle(parseInt(biller.id));
            }
        });
    });

    NotesFeature.loadNotesForBiller(biller);
    UI.Favorites.updateStar(Features.Favorites.isFavorite(biller.id));
    dom.billerCard.hidden = false;

    if (window.Anim) {
      Anim.enterCard(dom.billerCard);
    }
  },

  renderSuggestions: function(suggestions, query) {
    this.clearSuggestions();
    if (suggestions.length === 0) return;

    const VIRTUAL_LIST_THRESHOLD = 10;
    const queryRegex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'ig');

    if (suggestions.length > VIRTUAL_LIST_THRESHOLD) {
        this.suggestionsVirtualList = new VirtualList({
          container: dom.suggestionsList,
          items: suggestions,
          itemHeight: 44,
          renderItem: (biller, index) => {
            const highlightedName = biller.name.replace(queryRegex, `<strong>$1</strong>`);
            return `<li class="suggestion-item" id="suggestion-${index}" role="option" data-id="${biller.id}">
                      <span>${highlightedName}</span>
                      <span class="suggestion-tla">${biller.tla}</span>
                    </li>`;
          }
        });
    } else {
        const fragment = document.createDocumentFragment();
        suggestions.forEach((biller, index) => {
            const item = document.createElement('li');
            item.className = 'suggestion-item';
            item.id = `suggestion-${index}`;
            item.setAttribute('role', 'option');
            item.dataset.id = biller.id;
            const highlightedName = biller.name.replace(queryRegex, `<strong>$1</strong>`);
            item.innerHTML = `<span>${highlightedName}</span><span class="suggestion-tla">${biller.tla}</span>`;
            fragment.appendChild(item);
        });
        dom.suggestionsList.appendChild(fragment);
        dom.suggestionsList.style.height = '';
    }
    
    dom.suggestionsList.hidden = false;
    dom.searchWrapper.setAttribute('aria-expanded', 'true');
    state.activeSuggestionIndex = -1;
  },

  clearSuggestions: function() {
    if (this.suggestionsVirtualList) {
      this.suggestionsVirtualList.destroy();
      this.suggestionsVirtualList = null;
    }
    state.currentSuggestions = [];
    state.activeSuggestionIndex = -1;
    dom.suggestionsList.innerHTML = '';
    dom.suggestionsList.hidden = true;
    dom.searchWrapper.setAttribute('aria-expanded', 'false');
    dom.searchInput.removeAttribute('aria-activedescendant');
  },

  updateActiveSuggestion: function() {
    dom.suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
        const itemId = item.dataset.id;
        const fullListIndex = state.currentSuggestions.findIndex(b => b.id == itemId);

        if (fullListIndex === state.activeSuggestionIndex) {
            item.classList.add('is-active');
            item.setAttribute('aria-selected', 'true');
            dom.searchInput.setAttribute('aria-activedescendant', item.id);
        } else {
            item.classList.remove('is-active');
            item.setAttribute('aria-selected', 'false');
        }
    });
  },

  showNotification: function(message, type = 'info') {
    dom.notificationBanner.textContent = message;
    dom.notificationBanner.className = `notification-banner is-${type}`;
    dom.notificationBanner.hidden = false;
    setTimeout(() => { dom.notificationBanner.hidden = true; }, 4000);
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