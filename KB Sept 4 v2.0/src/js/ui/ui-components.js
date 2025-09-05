/**
 * UI COMPONENTS
 * ==================
 * This is the definitive version for the file:// compatible architecture.
 * It contains the UI logic for generic, reusable components like Popovers,
 * Modals, and Drawers.
 *
 * It has been upgraded to use the FrameUpdater for batched DOM writes
 * and the View Transitions API for smooth open/close animations.
 */

UI.Popover = {
  toggle(popover, button) {
    popover.hidden ? this.open(popover, button) : this.close(popover, button);
  },

  open(popover, button) {
    state.activePopover = { popover, button };
    Utils.FrameUpdater.schedule(() => {
      popover.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    });
  },

  close(popover, button) {
    state.activePopover = null;
    Utils.FrameUpdater.schedule(() => {
      popover.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    });
  }
};

UI.Modal = {
  directoryVirtualList: null,

  open(modalElement) {
    const openModal = () => {
      state.activeModal = modalElement;
      Utils.FrameUpdater.schedule(() => {
        modalElement.hidden = false;
        document.body.style.overflow = 'hidden';
        modalElement.classList.add('is-open');

        // Animate the modal content appearance
        const content = modalElement.querySelector('.modal-content');
        if (content && content.animate && !Utils.prefersReducedMotion()) {
            content.animate([
                { opacity: 0, transform: 'scale(0.95)' },
                { opacity: 1, transform: 'scale(1)' }
            ], {
                duration: 150,
                easing: 'var(--easing-decelerate)'
            });
        }

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
      });
    };
    
    if (document.startViewTransition && !Utils.prefersReducedMotion()) {
      document.startViewTransition(() => openModal());
    } else {
      openModal();
    }
  },

  close(modalElement) {
    const closeModal = () => {
      state.activeModal = null;
      Utils.FrameUpdater.schedule(() => {
        modalElement.classList.remove('is-open');
        document.body.style.overflow = '';
        
        const onTransitionEnd = () => {
          Utils.FrameUpdater.schedule(() => {
            modalElement.hidden = true;
            if (this.directoryVirtualList) {
              this.directoryVirtualList.destroy();
              this.directoryVirtualList = null;
              dom.directoryModalList.innerHTML = '';
            }
          });
          modalElement.removeEventListener('transitionend', onTransitionEnd);
        };
        modalElement.addEventListener('transitionend', onTransitionEnd);
      });
    };

    if (document.startViewTransition && !Utils.prefersReducedMotion()) {
      document.startViewTransition(() => closeModal());
    } else {
      closeModal();
    }
  }
};

UI.Drawer = {
  lastFocused: null,

  open(drawerElement) {
    const openDrawer = () => {
      this.lastFocused = document.activeElement;
      state.activeDrawer = drawerElement;
      Utils.FrameUpdater.schedule(() => {
        drawerElement.hidden = false;
        // Use a micro-task to ensure the 'hidden' attribute is removed before adding the class
        Promise.resolve().then(() => {
            Utils.FrameUpdater.schedule(() => {
                drawerElement.classList.add('is-open');
                const firstFocusable = drawerElement.querySelector('button, input, [href]');
                if (firstFocusable) firstFocusable.focus();
            });
        });
      });
    };

    if (document.startViewTransition && !Utils.prefersReducedMotion()) {
        document.startViewTransition(() => openDrawer());
    } else {
        openDrawer();
    }
  },

  close(drawerElement) {
    const closeDrawer = () => {
      if (!drawerElement) return;
      state.activeDrawer = null;
      Utils.FrameUpdater.schedule(() => {
        drawerElement.classList.remove('is-open');
        if (this.lastFocused) this.lastFocused.focus();
        
        const onTransitionEnd = () => {
            Utils.FrameUpdater.schedule(() => {
                drawerElement.hidden = true;
            });
            drawerElement.removeEventListener('transitionend', onTransitionEnd);
        };
        drawerElement.addEventListener('transitionend', onTransitionEnd);
      });
    };

    if (document.startViewTransition && !Utils.prefersReducedMotion()) {
        document.startViewTransition(() => closeDrawer());
    } else {
        closeDrawer();
    }
  }
};