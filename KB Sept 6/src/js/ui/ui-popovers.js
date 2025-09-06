/**
 * UI POPOVERS
 * ==================
 * This file contains the UI logic for creating and managing the new
 * header-driven popover menus for features like Themes, Favorites, and Area Lookup.
 */

// This module is attached to the main UI object.
UI.Popovers = {
  /**
   * Initializes the popover system by attaching click listeners to the
   * header buttons. This should be called once when the application starts.
   */
  init() {
    const popoverButtons = {
        favoritesPopoverBtn: { popover: dom.favoritesPopover },
        areaLookupPopoverBtn: { popover: dom.areaLookupPopover },
        themePopoverBtn: { popover: dom.themePopover },
        settingsBtn: { popover: dom.settingsPopover },
    };

    for (const btnId in popoverButtons) {
        const buttonEl = dom[btnId];
        const popoverEl = popoverButtons[btnId].popover;
        if (buttonEl && popoverEl) {
            buttonEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle(popoverEl, buttonEl);
            });
        }
    }
  },

  /**
   * Toggles a popover's visibility, ensuring only one is open at a time.
   * @param {HTMLElement} popoverEl The popover element to toggle.
   * @param {HTMLElement} buttonEl The button that triggers the popover.
   */
  toggle(popoverEl, buttonEl) {
    const isAlreadyOpen = state.activePopover && state.activePopover.popover === popoverEl;

    if (state.activePopover) {
      this.closeActive();
    }

    if (!isAlreadyOpen) {
      this.open(popoverEl, buttonEl);
    }
  },

  /**
   * Opens a specific popover and handles any special logic.
   * @param {HTMLElement} popoverEl The popover element to open.
   * @param {HTMLElement} buttonEl The button that triggers the popover.
   */
  open(popoverEl, buttonEl) {
    if (!popoverEl || !buttonEl) return;

    popoverEl.hidden = false;
    buttonEl.setAttribute('aria-expanded', 'true');
    state.activePopover = { popover: popoverEl, button: buttonEl };

    if (popoverEl === dom.favoritesPopover) {
        Features.Favorites.render(Features.Favorites.list);
    }
    
    if (popoverEl === dom.areaLookupPopover) {
        if (dom.areaLookupInput) {
            dom.areaLookupInput.focus();
        }
    }
  },

  /**
   * Closes the currently active popover.
   */
  closeActive() {
    if (!state.activePopover) {
      return;
    }
    const { popover, button } = state.activePopover;
    popover.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    state.activePopover = null;
  }
};