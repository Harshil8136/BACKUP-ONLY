/**
 * UI COMPONENTS
 * ==================
 * This file contains the UI logic for generic, reusable components
 * like Popovers, Modals, and Drawers.
 *
 * It appends its modules to the global UI object, so it must be loaded
 * AFTER ui-core.js.
 */

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

UI.Drawer = {
  open(drawerElement) {
      this.lastFocused = document.activeElement; 
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
      drawerElement.classList.remove('is-open');
      if (this.lastFocused) this.lastFocused.focus();
      state.activeDrawer = null;
  }
};