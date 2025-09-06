/**
 * VIRTUAL LIST MODULE
 * ==================
 * A lightweight, reusable virtual scroller to render long lists efficiently.
 * It only creates DOM nodes for the items visible in the viewport.
 */

class VirtualList {
  /**
   * @param {object} options - Configuration for the virtual list.
   * @param {HTMLElement} options.container - The scrollable container element.
   * @param {Array<any>} options.items - The full array of data items.
   * @param {number} options.itemHeight - The fixed height of a single item in pixels.
   * @param {function(any): string} options.renderItem - A function that takes an item and returns its HTML string.
   */
  constructor({ container, items, itemHeight, renderItem }) {
    if (!container || !items || !itemHeight || !renderItem) {
      throw new Error('VirtualList is missing required options.');
    }

    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.renderItem = renderItem;
    
    // The number of extra items to render above and below the viewport
    this.buffer = 5;

    // Create the necessary DOM structure
    this.totalHeight = items.length * itemHeight;
    this.container.style.height = `${this.totalHeight}px`;
    this.container.style.position = 'relative';

    this.viewport = document.createElement('div');
    this.viewport.style.position = 'absolute';
    this.viewport.style.width = '100%';
    this.container.appendChild(this.viewport);

    // Bind event listener and perform initial render
    this.onScroll = this._onScroll.bind(this);
    this.container.parentElement.addEventListener('scroll', this.onScroll);
    
    // Initial render
    this.render();
  }

  /**
   * The main render loop, called on scroll.
   */
  render() {
    const parent = this.container.parentElement;
    const scrollTop = parent.scrollTop;
    const viewportHeight = parent.clientHeight;

    // Calculate the start and end indices of the items to render
    let startIndex = Math.floor(scrollTop / this.itemHeight);
    let endIndex = Math.ceil((scrollTop + viewportHeight) / this.itemHeight);

    // Apply the buffer to render items just outside the viewport
    startIndex = Math.max(0, startIndex - this.buffer);
    endIndex = Math.min(this.items.length, endIndex + this.buffer);

    // Get the slice of items to render
    const visibleItems = this.items.slice(startIndex, endIndex);

    // Generate the HTML for the visible items
    const html = visibleItems.map(this.renderItem).join('');
    this.viewport.innerHTML = html;

    // Position the viewport using CSS transform for performance
    const offsetY = startIndex * this.itemHeight;
    this.viewport.style.transform = `translateY(${offsetY}px)`;
  }

  /**
   * Scroll event handler. Uses requestAnimationFrame to prevent layout thrashing.
   */
  _onScroll() {
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  /**
   * Cleans up event listeners when the component is no longer needed.
   */
  destroy() {
    this.container.parentElement.removeEventListener('scroll', this.onScroll);
  }
}