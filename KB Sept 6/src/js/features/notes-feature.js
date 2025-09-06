/**
 * NOTES FEATURE
 * ==================
 * This file is responsible for finding the correct notes data for a given
 * biller and passing it to the UI layer for rendering.
 *
 * UPDATED: Added an entry for American Water (AWK) to the notes data map.
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
      'AETX': typeof AETX_NOTES !== 'undefined' ? AETX_NOTES : null,
      'CEMI': typeof CEMI_NOTES !== 'undefined' ? CEMI_NOTES : null,
      'COMD': typeof COMD_NOTES !== 'undefined' ? COMD_NOTES : null,
      'NSRC': typeof NSRC_NOTES !== 'undefined' ? NSRC_NOTES : null,
      'DNE': typeof DNE_NOTES !== 'undefined' ? DNE_NOTES : null,
      'CEB': typeof CEB_NOTES !== 'undefined' ? CEB_NOTES : null,
      'DUQL': typeof DUQL_NOTES !== 'undefined' ? DUQL_NOTES : null,
      'PAC': typeof PAC_NOTES !== 'undefined' ? PAC_NOTES : null,
      'AWK': typeof AWK_NOTES !== 'undefined' ? AWK_NOTES : null,
      'TGXH': typeof TGXH_NOTES !== 'undefined' ? TGXH_NOTES : null,
      'DCN3': typeof DCN3_NOTES !== 'undefined' ? DCN3_NOTES : null,
      'PSE': typeof PSE_NOTES !== 'undefined' ? PSE_NOTES : null,
      'HYD1': typeof HYD1_NOTES !== 'undefined' ? HYD1_NOTES : null,
      'HYDO': typeof HYD1_NOTES !== 'undefined' ? HYD1_NOTES : null,
    };

    this.currentBillerNotes = notesDataMap[biller.tla] || null;

    // Call the UI to render the notes component.
    UI_Notes.render(this.currentBillerNotes);
  },

  /**
   * Handles a click on a standard category tab (for stateless notes).
   * @param {string} categoryKey The key of the category that was clicked.
   */
  handleCategoryClick(categoryKey) {
    if (this.activeCategory === categoryKey) return;
    
    this.activeCategory = categoryKey;
    
    // Call the UI to update the button states and render the new content.
    UI_Notes.update(this.currentBillerNotes, this.activeCategory);
  }
};