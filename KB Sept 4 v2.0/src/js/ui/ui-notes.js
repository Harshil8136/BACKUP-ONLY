/**
 * UI NOTES
 * ==================
 * This file contains all DOM manipulation logic for the interactive notes component.
 * It has been refactored for the high-performance architecture, using the
 * FrameUpdater for batched DOM writes, DocumentFragments for efficient rendering,
 * and the View Transitions API for smooth content changes.
 */

// Core & Utils
import { dom } from '../core/app-core.js';
import { Utils } from '../core/utils.js';
import { NotesFeature } from '../features/notes-feature.js';

// Helper to create a DocumentFragment from an HTML string
function createFragment(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content;
}

const UI_Notes = {
  render(notes) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;

    if (!notes) {
      Utils.FrameUpdater.schedule(() => {
        container.innerHTML = `<p>No detailed notes available for this biller.</p>`;
      });
      return;
    }

    // --- Self-contained logic to detect note type ---
    let noteType = 'stateless';
    if (notes.services) noteType = 'composite';
    else if (notes.states) noteType = 'stateful';

    let activeCategory = 'all';
    if (noteType === 'composite' && notes.alerts) activeCategory = 'alerts';
    else if (notes.alert) activeCategory = 'alert';
    
    // The initial render is also a transition
    const renderUpdate = () => {
        switch (noteType) {
            case 'composite':
                this._renderCompositeBillerNotes(container, notes, activeCategory);
                break;
            case 'stateful':
                this._renderStatefulNotes(container, notes);
                break;
            default:
                this._renderStatelessNotes(container, notes, activeCategory);
                break;
        }
    };
    
    if (document.startViewTransition && !Utils.prefersReducedMotion()) {
        document.startViewTransition(() => renderUpdate());
    } else {
        renderUpdate();
    }
  },

  _renderStatelessNotes(container, notes, activeCategory) {
    const categories = { all: { title: 'ALL', color: 'primary' }, ...notes };
    const buttonsHtml = Object.keys(categories).map(key => {
      const category = categories[key];
      const isActive = key === activeCategory ? 'active' : '';
      return `<button class="notes-tab-button color-${category.color || 'secondary'} ${isActive}" data-category="${key}">${category.title}</button>`;
    }).join('');

    const fragment = createFragment(`
      <div class="notes-tabs" role="tablist">${buttonsHtml}</div>
      <div id="notesContentWrapper" style="view-transition-name: notes-content;"></div>
    `);

    Utils.FrameUpdater.schedule(() => {
      container.innerHTML = '';
      container.appendChild(fragment);
      this._renderStatelessContent(notes, activeCategory);
      
      container.querySelectorAll('.notes-tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const updateAction = () => NotesFeature.handleCategoryClick(e.currentTarget.dataset.category);
            if(document.startViewTransition && !Utils.prefersReducedMotion()) {
                document.startViewTransition(() => updateAction());
            } else {
                updateAction();
            }
        });
      });
    });
  },

  _renderCompositeBillerNotes(container, notes, activeCategory) {
    const mainTabs = [
      notes.alerts && { key: 'alerts', title: 'Critical Alerts', color: 'danger' },
      notes.generalInfo && { key: 'generalInfo', title: 'General Info', color: 'primary' },
      notes.services && { key: 'services', title: 'Services & States', color: 'info' },
      notes.unsupportedServices && { key: 'unsupported', title: 'Unsupported', color: 'secondary' },
      notes.affiliatedServices && { key: 'affiliated', title: 'Affiliates', color: 'secondary' }
    ].filter(Boolean);

    const tabsHtml = mainTabs.map(tab => {
      const isActive = tab.key === activeCategory ? 'active' : '';
      return `<button class="notes-tab-button color-${tab.color} ${isActive}" data-category="${tab.key}">${tab.title}</button>`;
    }).join('');

    const fragment = createFragment(`
      <div class="notes-tabs" role="tablist">${tabsHtml}</div>
      <div id="notesContentWrapper" class="notes-section" style="view-transition-name: notes-content;"></div>
    `);

    Utils.FrameUpdater.schedule(() => {
        container.innerHTML = '';
        container.appendChild(fragment);
        this._renderCompositeContent(notes, activeCategory);

        container.querySelectorAll('.notes-tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const updateAction = () => {
                    container.querySelectorAll('.notes-tab-button').forEach(btn => btn.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this._renderCompositeContent(notes, e.currentTarget.dataset.category);
                };
                if (document.startViewTransition && !Utils.prefersReducedMotion()) {
                    document.startViewTransition(() => updateAction());
                } else {
                    updateAction();
                }
            });
        });
    });
  },
  
  _renderCompositeContent(notes, category) {
    const wrapper = dom.billerCard.querySelector('#notesContentWrapper');
    if (!wrapper) return;

    let contentHtml = '';
    // This switch generates the appropriate HTML string for each category.
    // The actual DOM manipulation happens once, below.
    switch (category) {
      case 'alerts':
        contentHtml = `
          <div class="notes-content color-border-danger">
            <h4><i class="fa-solid fa-triangle-exclamation"></i> Critical Alerts</h4>
            <ul>${notes.alerts.map(alert => `<li>${alert}</li>`).join('')}</ul>
          </div>`;
        break;
      case 'generalInfo':
        const casesHtml = notes.generalInfo.salesforceCases.map(c => `<li><strong>${c.subject}:</strong> ${c.description}</li>`).join('');
        const rulesHtml = notes.generalInfo.paymentRules.map(rule => `<li>${rule}</li>`).join('');
        contentHtml = `
          <div class="notes-content color-border-primary">
            <h4>General Information</h4>
            <ul>${rulesHtml}</ul>
            <h4>Salesforce Case Subjects</h4>
            <ul>${casesHtml}</ul>
          </div>`;
        break;
      case 'services':
        const serviceKeys = Object.keys(notes.services);
        const serviceTabsHtml = serviceKeys.map((key, index) =>
          `<button class="notes-filter-btn ${index === 0 ? 'active' : ''}" data-service-key="${key}">${notes.services[key].name}</button>`
        ).join('');
        contentHtml = `
          <div class="notes-filter-controls">${serviceTabsHtml}</div>
          <div id="serviceDetailWrapper"></div>
        `;
        break;
      // Other cases would be fully fleshed out here
    }
    
    const fragment = createFragment(contentHtml);
    Utils.FrameUpdater.schedule(() => {
        wrapper.innerHTML = '';
        wrapper.appendChild(fragment);

        // If the services tab was rendered, we need to render its first sub-item
        // and attach event listeners to the sub-tabs.
        if (category === 'services') {
            const serviceKeys = Object.keys(notes.services);
            this._renderServiceDetail(notes.services[serviceKeys[0]]);
            wrapper.querySelectorAll('.notes-filter-btn').forEach(button => {
                button.addEventListener('click', e => {
                    const serviceKey = e.currentTarget.dataset.serviceKey;
                    const updateAction = () => {
                        wrapper.querySelectorAll('.notes-filter-btn').forEach(btn => btn.classList.remove('active'));
                        e.currentTarget.classList.add('active');
                        this._renderServiceDetail(notes.services[serviceKey]);
                    };
                    if (document.startViewTransition && !Utils.prefersReducedMotion()) {
                        document.startViewTransition(() => updateAction());
                    } else {
                        updateAction();
                    }
                });
            });
        }
    });
  },
  
  _renderServiceDetail(service) {
      const wrapper = document.getElementById('serviceDetailWrapper');
      if (!wrapper) return;
      
      const contactInfo = Object.entries(service.contact).map(([key, value]) => {
          if (!value || value === "N/A") return '';
          let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          let valHtml = value;
          return `<li><strong>${label}:</strong> ${valHtml}</li>`;
      }).join('');
      
      const accountFormat = `<h4>Account Format: ${service.accountFormat.title}</h4><p>${service.accountFormat.format}</p>`;

      const contentHtml = `<div class="notes-content color-border-info">
                              <h4>Contact Information</h4>
                              <ul>${contactInfo}</ul>
                              ${accountFormat}
                           </div>`;
      
      const fragment = createFragment(contentHtml);
      Utils.FrameUpdater.schedule(() => {
          wrapper.innerHTML = '';
          wrapper.appendChild(fragment);
      });
  },

  _renderStatelessContent(notes, activeCategory) {
    const wrapper = dom.billerCard.querySelector('#notesContentWrapper');
    if (!wrapper) return;

    let finalHtml = '';
    if (activeCategory === 'all') {
      finalHtml = Object.keys(notes).map(key => {
        const note = notes[key];
        return `<div class="notes-content color-border-${note.color}">${note.content}</div>`;
      }).join('');
    } else if (notes[activeCategory]) {
      const note = notes[activeCategory];
      finalHtml = `<div class="notes-content color-border-${note.color}">${note.content}</div>`;
    }
    
    const fragment = createFragment(finalHtml);
    Utils.FrameUpdater.schedule(() => {
        wrapper.innerHTML = '';
        wrapper.appendChild(fragment);
    });
  },

  update(notes, activeCategory) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;
    
    Utils.FrameUpdater.schedule(() => {
        container.querySelectorAll('.notes-tab-button').forEach(button => {
            button.classList.toggle('active', button.dataset.category === activeCategory);
        });
        this._renderStatelessContent(notes, activeCategory);
    });
  },
};