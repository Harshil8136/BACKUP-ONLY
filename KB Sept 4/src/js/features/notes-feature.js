/**
 * NOTES FEATURE
 * ==================
 * UPDATED: This file has been simplified. It is now only responsible for
 * finding the correct notes data for a biller and passing it to the UI layer.
 * All rendering logic is now handled by ui-notes.js.
 */

const NotesFeature = {
  currentBillerNotes: null,
  activeCategory: 'all',

  /**
   * Loads the appropriate notes object for the selected biller and
   * triggers the initial UI render.
   * @param {object} biller The biller object currently displayed.
   */
  loadNotesForBiller(biller) {
    // This map determines which notes object to load based on the biller's TLA.
    const notesDataMap = {
      'BGE': typeof BGE_NOTES !== 'undefined' ? BGE_NOTES : null,
      'CEMI': typeof CEMI_NOTES !== 'undefined' ? CEMI_NOTES : null,
      'NSRC': typeof NSRC_NOTES !== 'undefined' ? NSRC_NOTES : null,
      'DNE': typeof DNE_NOTES !== 'undefined' ? DNE_NOTES : null,
      'CEB': typeof CEB_NOTES !== 'undefined' ? CEB_NOTES : null,
    };

    this.currentBillerNotes = notesDataMap[biller.tla] || null;

    // Call the UI to render the notes component.
    // The UI_Notes file will now handle all logic for how to render it.
    UI_Notes.render(this.currentBillerNotes);
  },

  /**
   * Handles a click on a standard category tab (for stateless notes).
   * @param {string} categoryKey The key of the category that was clicked.
   */
  handleCategoryClick(categoryKey) {
    if (this.activeCategory === categoryKey) return;
    
    this.activeCategory = categoryKey;
    
    // Call the UI to update the button states and render the new content
    UI_Notes.update(this.currentBillerNotes, this.activeCategory);
  }
};