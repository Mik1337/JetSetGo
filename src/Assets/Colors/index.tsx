/**
 * This file is used to export all the colours used in the application
 */

interface ColourGroup {
  [key: string]: string;
}

/**
 * @property {object} Primary - Use these for major UI elements like headers, footers, buttons, and icons.
 */
export const Primary: ColourGroup = {
  Blue: '#007bff', // vibrant blue
};

/**
 *  @property {object} Secondary - Use these for secondary UI elements.
 */
export const Secondary: ColourGroup = {
  Orange: '#fd7e14', // sunset orange
  Green: '#28a745', // earthy green
  Blue: '#17a2b8', // sky blue
};

/**
 * @property {object} Neutral - Utilize these for backgrounds, text, and less prominent components.
 */
export const Neutral: ColourGroup = {
  Gray: '#f8f9fa', // light gray - for bg
  DarkGray: '#343a40', // dark gray - for text
  White: '#ffffff', // white, card, text bg and elements that need contrast
};

/**
 * @property {object} Highlight - Ideal for call-to-action buttons, special offers, or featured sections.
 */
export const Highlight: ColourGroup = {
  Yellow: '#ffc107', // bright yello, grab attention
};

/**
 * @property {object} Misc - Use these for miscellaneous UI elements.
 */
export const Misc: ColourGroup = {
  Red: '#dc3545', // warm red, warning or error
  Purple: '#6f42c1', // Soft purple, for premium or exclusive (offers and such)
};
