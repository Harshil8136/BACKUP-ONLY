/**
 * THEME FEATURE (OPERATOR)
 * ==================
 * This file contains all the logic for managing the application's themes.
 * It reads the theme data from theme-data.js, dynamically builds the UI
 * for the theme selector, and handles applying themes and saving user preferences.
 */

const ThemeFeature = {
  /**
   * Initializes the theme system.
   */
  init() {
    // 1. Build the theme selector UI from the manifest file.
    this._buildSelectorUI();

    // 2. Attach an event listener to the newly created UI.
    // We attach it to the container for efficiency.
    dom.themeSelector?.addEventListener('change', (e) => this._handleThemeChange(e));

    // 3. Load the saved theme from localStorage, defaulting to 'light'.
    const savedTheme = Utils.storageGet('biller-theme', 'light');
    this.apply(savedTheme);
  },

  /**
   * Applies a new theme to the application.
   * @param {string} themeId The ID of the theme to apply (e.g., 'catppuccin-latte').
   */
  apply(themeId) {
    if (!themeId) return;

    // Remove any existing theme-class from the body.
    document.body.className = document.body.className.replace(/theme-[\w-]+/g, '').trim();
    
    // Add the new theme class.
    document.body.classList.add(`theme-${themeId}`);

    // Save the preference.
    Utils.storageSet('biller-theme', themeId);

    // Ensure the radio button selection matches the active theme.
    this._syncSelectorState(themeId);
  },

  /**
   * Handles the 'change' event from the theme selector radio buttons.
   * @param {Event} event The DOM event object.
   */
  _handleThemeChange(event) {
    if (event.target.name === 'theme') {
        const selectedThemeId = event.target.value;
        this.apply(selectedThemeId);
    }
  },

  /**
   * Dynamically builds the HTML for the theme selector and injects it into the DOM.
   */
  _buildSelectorUI() {
    if (!dom.themeSelector || typeof THEMES === 'undefined') return;

    // Group themes by their 'group' property.
    const groupedThemes = THEMES.reduce((acc, theme) => {
        (acc[theme.group] = acc[theme.group] || []).push(theme);
        return acc;
    }, {});

    let finalHtml = '';

    // Create a fieldset for each group.
    for (const groupName in groupedThemes) {
        const themesInGroup = groupedThemes[groupName];
        
        const radioButtonsHtml = themesInGroup.map(theme => `
            <label>
                <input type="radio" name="theme" value="${theme.id}">
                <span>${theme.name}</span>
            </label>
        `).join('');

        finalHtml += `
            <fieldset class="theme-selector-group">
                <legend>${groupName}</legend>
                <div class="radio-group" style="grid-template-columns: repeat(2, 1fr);">
                    ${radioButtonsHtml}
                </div>
            </fieldset>
        `;
    }
    
    dom.themeSelector.innerHTML = finalHtml;
  },

  /**
   * Ensures the correct radio button is checked in the UI.
   * @param {string} themeId The ID of the currently active theme.
   */
  _syncSelectorState(themeId) {
    if (!dom.themeSelector) return;

    const activeRadio = dom.themeSelector.querySelector(`input[value="${themeId}"]`);
    if (activeRadio) {
        activeRadio.checked = true;
    }
  }
};