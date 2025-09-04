/**
 * UI COMPONENTS - CORE
 * ==================
 * UPDATED: The UI.displayBiller function has been completely rewritten to be
 * data-driven. It now reads the new flexible `contacts` and `customFields`
 * arrays from the biller object to dynamically render the UI. This allows for
 * multiple phone numbers and unique biller data to be displayed without
 * needing to change this file again.
 *
 * This file contains the core, volatile rendering functions for the app.
 * It attaches its methods to the global UI object created in the stable file.
 */

UI.displayBiller = function(biller) {
    if (!biller) {
      dom.billerCard.hidden = true;
      return;
    }
    dom.locationCard.hidden = true;
    if (dom.locationResultsBox) {
        dom.locationResultsBox.hidden = true;
    }

    // --- Helper function to create the action buttons ---
    const createActionButton = (url, text, icon, type) => {
      if (!url) return '';
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="btn-biller-card btn-${type}"><i class="fa-solid ${icon}"></i> ${text}</a>`;
    };

    // --- Upgraded helper to create contact fields ---
    // This now intelligently decides if a field should be copyable.
    const createContactField = (label, value) => {
        if (!value) return '';

        // If the value is an instruction, display it as plain text.
        if (value.toLowerCase().includes('see notes') || value.toLowerCase().includes('refer to kb')) {
            return `<div class="quick-link-item non-copyable">
                      <strong>${label}</strong>
                      <span>${value}</span>
                    </div>`;
        }
        
        // Otherwise, make it a copyable field.
        return `<div class="quick-link-item">
                  <strong>${label}</strong>
                  <div class="copyable-field compact">
                      <span>${value}</span>
                      <button class="icon-btn icon-btn-copy" aria-label="Copy ${label}"><i class="fa-solid fa-copy"></i></button>
                  </div>
                </div>`;
    };

    // --- NEW: Dynamically generate all contact fields from the data file ---
    let contactsHtml = '';
    if (biller.contacts && biller.contacts.length > 0) {
        contactsHtml = biller.contacts.map(contact => createContactField(contact.label, contact.value)).join('');
    }

    // --- NEW: Dynamically generate custom fields from the data file ---
    let customFieldsHtml = '';
    if (biller.customFields && biller.customFields.length > 0) {
        const fieldsList = biller.customFields.map(field => `<li><strong>${field.label}:</strong> ${field.value}</li>`).join('');
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

    // --- The Main HTML Template ---
    // This now injects the dynamically generated contacts and custom fields.
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

    // --- Event Listener Attachment ---
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
};

UI.renderSuggestions = function(suggestions, query) {
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

UI.Modal = {
    directoryVirtualList: null,
    
    open(modalElement) {
        state.activeModal = modalElement;
        modalElement.hidden = false; 
        modalElement.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        if (!this.directoryVirtualList && BILLERS && BILLERS.length > 0) {
            const sortedBillers = DataHelpers.sortBillersByName(BILLERS);
            this.directoryVirtualList = new VirtualList({
                container: dom.directoryModalList,
                items: sortedBillers,
                itemHeight: 46,
                renderItem: (biller) => `
                    <li class="directory-item">
                        <span class="status-dot ${biller.live ? 'is-live' : 'is-offline'}"></span>
                        <span class="directory-name">${biller.name}</span>
                        <span class="directory-tla">${biller.tla}</span>
                    </li>`
            });
        }
    },
    close(modalElement) {
        if (this.directoryVirtualList) {
            this.directoryVirtualList.destroy();
            this.directoryVirtualList = null;
        }
        state.activeModal = null; 
        modalElement.classList.remove('is-open');
        document.body.style.overflow = '';
        dom.directoryModalList.innerHTML = '';
    }
};