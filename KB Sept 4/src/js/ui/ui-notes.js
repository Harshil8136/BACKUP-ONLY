/**
 * UI NOTES
 * ==================
 * UPDATED: This file is now fully self-contained. The `render` function
 * now includes the logic to detect the note type (stateless, stateful, or
 * composite) and route it to the correct internal renderer. This makes the
 * component more robust and resilient to caching issues.
 */

const UI_Notes = {

  render(notes) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;

    if (!notes) {
      container.innerHTML = `<p>No detailed notes available for this biller.</p>`;
      return;
    }

    // --- CRITICAL FIX IS HERE: Self-contained logic to detect note type ---
    let noteType = 'stateless'; // Default type
    if (notes.services) {
        noteType = 'composite'; // For complex billers like DNE/CEB
    } else if (notes.states) {
        noteType = 'stateful'; // For billers with state-by-state info
    }

    // Determine the default active category
    let activeCategory = 'all';
    if (noteType === 'composite' && notes.alerts) {
        activeCategory = 'alerts';
    } else if (notes.alert) {
        activeCategory = 'alert';
    }

    // Route to the correct renderer based on the detected type
    switch (noteType) {
      case 'composite':
        this._renderCompositeBillerNotes(container, notes, activeCategory);
        break;
      case 'stateful':
        this._renderStatefulNotes(container, notes);
        break;
      case 'stateless':
      default:
        this._renderStatelessNotes(container, notes, activeCategory);
        break;
    }
  },

  _renderStatelessNotes(container, notes, activeCategory) {
    const categories = { all: { title: 'ALL', color: 'primary' }, ...notes };
    const buttonsHtml = Object.keys(categories).map(key => {
      const category = categories[key];
      const isActive = key === activeCategory ? 'active' : '';
      return `<button class="notes-tab-button color-${category.color || 'secondary'} ${isActive}" data-category="${key}">${category.title}</button>`;
    }).join('');

    container.innerHTML = `
      <div class="notes-tabs" role="tablist">${buttonsHtml}</div>
      <div id="notesContentWrapper"></div>
    `;

    this._renderStatelessContent(notes, activeCategory);

    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.addEventListener('click', (e) => NotesFeature.handleCategoryClick(e.currentTarget.dataset.category));
    });
  },

  _renderStatefulNotes(container, notes) {
    const stateKeys = Object.keys(notes.states);
    const stateTabsHtml = stateKeys.map((key, index) => {
      const stateName = notes.states[key].name;
      return `<button class="notes-tab-button color-primary ${index === 0 ? 'active' : ''}" data-state-key="${key}">${stateName}</button>`;
    }).join('');

    let additionalNotesHtml = '';
    for (const key in notes) {
      if (key !== 'states') {
        additionalNotesHtml += `<div class="notes-section">
                                  <h3>${notes[key].title}</h3>
                                  <div class="notes-content color-border-${notes[key].color}">${notes[key].content}</div>
                                </div>`;
      }
    }

    container.innerHTML = `
      <h4>State-Specific Information</h4>
      <div class="notes-tabs" role="tablist">${stateTabsHtml}</div>
      <div id="notesContentWrapper"></div>
      ${additionalNotesHtml}
    `;

    this._renderStateContent(notes, stateKeys[0]);

    container.querySelectorAll('.notes-tab-button[data-state-key]').forEach(button => {
      button.addEventListener('click', (e) => {
        container.querySelectorAll('.notes-tab-button[data-state-key]').forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this._renderStateContent(notes, e.currentTarget.dataset.stateKey);
      });
    });

    this._attachInteractiveListeners(container);
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

    container.innerHTML = `
      <div class="notes-tabs" role="tablist">${tabsHtml}</div>
      <div id="notesContentWrapper" class="notes-section"></div>
    `;

    this._renderCompositeContent(notes, activeCategory);

    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.addEventListener('click', (e) => {
        container.querySelectorAll('.notes-tab-button').forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this._renderCompositeContent(notes, e.currentTarget.dataset.category);
      });
    });
  },
  
  _renderCompositeContent(notes, category) {
    const wrapper = dom.billerCard.querySelector('#notesContentWrapper');
    if (!wrapper) return;

    let contentHtml = '';
    switch (category) {
      case 'alerts':
        contentHtml = `
          <div class="notes-content color-border-danger">
            <h4><i class="fa-solid fa-triangle-exclamation"></i> Critical Alerts</h4>
            <ul>${notes.alerts.map(alert => `<li>${alert}</li>`).join('')}</ul>
          </div>`;
        break;

      case 'generalInfo':
        const casesHtml = notes.generalInfo.salesforceCases.map(c =>
          `<li><strong>${c.subject}:</strong> ${c.description}</li>`
        ).join('');
        contentHtml = `
          <div class="notes-content color-border-primary">
            <h4>General Information</h4>
            <p><strong>Go Live Date:</strong> ${notes.generalInfo.goLiveDate} | <strong>Processor:</strong> ${notes.generalInfo.processor} | <strong>System Cutoff:</strong> ${notes.generalInfo.systemCutoff}</p>
            <h4>${notes.generalInfo.autoPaySetup.title}</h4>
            ${notes.generalInfo.autoPaySetup.content}
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
        wrapper.innerHTML = contentHtml;
        this._renderServiceDetail(notes.services[serviceKeys[0]]);
        wrapper.querySelectorAll('.notes-filter-btn').forEach(button => {
          button.addEventListener('click', e => {
            wrapper.querySelectorAll('.notes-filter-btn').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
            this._renderServiceDetail(notes.services[e.currentTarget.dataset.serviceKey]);
          });
        });
        break;
        
      case 'unsupported':
        const unsupportedHtml = notes.unsupportedServices.services.map(s => `<li><strong>${s.state}:</strong> Transfer to ${s.csr} (${s.hours})</li>`).join('');
        contentHtml = `
          <div class="notes-content color-border-secondary">
            <h4>${notes.unsupportedServices.title}</h4>
            <p>${notes.unsupportedServices.note}</p>
            <ul>${unsupportedHtml}</ul>
            <p><em><strong>Note:</strong> ${notes.unsupportedServices.questarNote}</em></p>
          </div>`;
        break;
        
      case 'affiliated':
        const affiliatedHtml = notes.affiliatedServices.services.map(s => `<li><strong>${s.name} (${s.tla}):</strong> ${s.note}</li>`).join('');
        contentHtml = `
          <div class="notes-content color-border-secondary">
            <h4>${notes.affiliatedServices.title}</h4>
            <ul>${affiliatedHtml}</ul>
          </div>`;
        break;
    }
    
    if (category !== 'services') {
        wrapper.innerHTML = contentHtml;
    }
    this._attachInteractiveListeners(wrapper);
  },
  
  _renderServiceDetail(service) {
      const wrapper = document.getElementById('serviceDetailWrapper');
      if (!wrapper) return;

      let contactInfo = Object.entries(service.contact).map(([key, value]) => {
          if (!value || value === "N/A") return '';
          let label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          let valHtml = value;
          if (key === 'internalCsr') {
              label += ' <small class="internal-badge">(Transfer Only)</small>';
          } else if (key.endsWith('Link') || key === 'website') {
              valHtml = `<a href="${value}" target="_blank" rel="noopener noreferrer">${value}</a>`;
          }
          return `<li><strong>${label}:</strong> ${valHtml}</li>`;
      }).join('');
      
      const rebrandingNote = service.rebrandingNote ? `<p class="rebranding-note"><strong>Note:</strong> ${service.rebrandingNote}</p>` : '';
      
      let paymentDetailsHtml = '<h4>Payment Details</h4><p>No specific payment rules provided.</p>';
      if (service.paymentDetails) {
          paymentDetailsHtml = Object.entries(service.paymentDetails).map(([key, details]) => {
              const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              return `
                  <h4>${title} Payments</h4>
                  <ul>
                      <li><strong>Fee:</strong> ${details.fee || details.feeModel}</li>
                      <li><strong>Max Payment:</strong> ${details.maxPayment}</li>
                      <li><strong>Velocity Limits:</strong> ${details.velocity || 'N/A'}</li>
                      <li><strong>Methods:</strong> ${details.methods ? details.methods.join(', ') : 'N/A'}</li>
                  </ul>
              `;
          }).join('');
      }

      wrapper.innerHTML = `
          <div class="notes-content color-border-info">
              ${rebrandingNote}
              <h4>Contact & Account</h4>
              <ul>
                  ${contactInfo}
                  <li><strong>Account Format:</strong> ${service.accountFormat}</li>
              </ul>
              ${paymentDetailsHtml}
          </div>
      `;
      this._attachInteractiveListeners(wrapper);
  },

  _renderStateContent(notes, stateKey) {
    const state = notes.states[stateKey];
    const wrapper = dom.billerCard.querySelector('#notesContentWrapper');
    if (!wrapper) return;

    wrapper.innerHTML = `
      <div class="notes-content color-border-primary">
        <h4>${state.name} Overview</h4>
        <ul>
          <li><strong>Website:</strong> <a href="${state.website}" target="_blank" rel="noopener noreferrer">${state.website}</a></li>
          <li><strong>Account Format:</strong> ${state.account_format}</li>
        </ul>
        ${state.content}
      </div>
    `;
    this._attachInteractiveListeners(wrapper);
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

    wrapper.innerHTML = finalHtml;
    this._attachInteractiveListeners(wrapper);
  },

  update(notes, activeCategory) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;

    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.classList.toggle('active', button.dataset.category === activeCategory);
    });
    this._renderStatelessContent(notes, activeCategory);
  },

  _attachInteractiveListeners(parentElement) {
    // This is a placeholder for future interactive elements
  }
};