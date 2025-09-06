/**
 * THEME DATA (MANIFEST)
 * ==================
 * This file contains the master list of all available themes for the application.
 * The Theme Feature operator reads this array to dynamically build the theme
 * selector UI in the settings popover.
 *
 * To add a new theme:
 * 1. Add its CSS block to themes.css.
 * 2. Add its metadata object to this array.
 */

const THEMES = [
  // --- Standard Themes ---
  {
    id: 'light',
    name: 'Light',
    group: 'Standard'
  },
  {
    id: 'dark',
    name: 'Dark',
    group: 'Standard'
  },

  // --- Eye-Resting Themes ---
  {
    id: 'solarized',
    name: 'Solarized',
    group: 'Eye-Resting'
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    group: 'Eye-Resting'
  },
  {
    id: 'sepia',
    name: 'Sepia',
    group: 'Eye-Resting'
  },
  {
    id: 'warm-gray',
    name: 'Warm Gray',
    group: 'Eye-Resting'
  },

  // --- Developer Themes ---
  {
    id: 'nord',
    name: 'Nord',
    group: 'Developer'
  },
  {
    id: 'monokai',
    name: 'Monokai',
    group: 'Developer'
  },
  {
    id: 'dracula',
    name: 'Dracula',
    group: 'Developer'
  },
  {
    id: 'one-dark',
    name: 'One Dark',
    group: 'Developer'
  },
  {
    id: 'gruvbox-dark',
    name: 'Gruvbox Dark',
    group: 'Developer'
  },
  {
    id: 'gruvbox-light',
    name: 'Gruvbox Light',
    group: 'Developer'
  },
  
  // --- Catppuccin Family ---
  {
    id: 'catppuccin-latte',
    name: 'Catppuccin Latte',
    group: 'Catppuccin'
  },
  {
    id: 'catppuccin-frappe',
    name: 'Catppuccin Frappé',
    group: 'Catppuccin'
  },
  {
    id: 'catppuccin-macchiato',
    name: 'Catppuccin Macchiato',
    group: 'Catppuccin'
  },
  {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    group: 'Catppuccin'
  },
  
  // --- Tokyo Night Family ---
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    group: 'Tokyo Night'
  },
  {
    id: 'tokyo-night-storm',
    name: 'Tokyo Night Storm',
    group: 'Tokyo Night'
  },
  {
    id: 'tokyo-night-day',
    name: 'Tokyo Night Day',
    group: 'Tokyo Night'
  },
  
  // --- Rosé Pine Family ---
  {
    id: 'rose-pine',
    name: 'Rosé Pine',
    group: 'Rosé Pine'
  },
  {
    id: 'rose-pine-moon',
    name: 'Rosé Pine Moon',
    group: 'Rosé Pine'
  },
  {
    id: 'rose-pine-dawn',
    name: 'Rosé Pine Dawn',
    group: 'Rosé Pine'
  },

  // --- Ayu Family ---
  {
    id: 'ayu-light',
    name: 'Ayu Light',
    group: 'Ayu'
  },
  {
    id: 'ayu-mirage',
    name: 'Ayu Mirage',
    group: 'Ayu'
  },
  {
    id: 'ayu-dark',
    name: 'Ayu Dark',
    group: 'Ayu'
  },

  // --- Specialty Themes ---
  {
    id: 'github',
    name: 'GitHub',
    group: 'Specialty'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    group: 'Specialty'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    group: 'Specialty'
  },
  {
    id: 'contrast-dark',
    name: 'High Contrast',
    group: 'Specialty'
  }
];