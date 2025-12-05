/**
 * Card Layout Configuration
 *
 * This file contains all position, scale, and size settings for card rendering.
 * Adjust these values to fine-tune the card layout without modifying the rendering code.
 *
 * Coordinate System:
 * - Cocos Creator: (0,0) at center, Y increases upward
 * - SVG: (0,0) at top-left, Y increases downward
 * - Conversion: SVG(x, y) = (cardCenterX + cocosX, cardCenterY - cocosY)
 *
 * Position with Parent:
 * - If `parent` is specified, position is relative to that parent's center
 * - If `parent` is omitted, position is relative to card center
 * - Valid parent keys: 'costFrame', 'descriptionArea', 'imageFrame', 'icon', 'awakeFrame'
 *
 * Usage Example:
 * ```typescript
 * import { defaultCardLayoutConfig } from './cardLayoutConfig';
 *
 * // Create a custom config by modifying the default
 * const customConfig = {
 *   ...defaultCardLayoutConfig,
 *   nameText: {
 *     ...defaultCardLayoutConfig.nameText,
 *     position: { x: 0, y: -10, parent: 'descriptionArea' }, // Relative to description area
 *     fontSize: 45, // Increase font size
 *   },
 *   // To render plain text without outline, omit outlineColor/offset or set offset to 0:
 *   costText: {
 *     position: { x: 0, y: 0, parent: 'costFrame' }, // Relative to cost frame
 *     fontSize: 41,
 *     fillColor: 'white',
 *     // outlineColor and offset omitted - will render as plain text
 *   },
 * };
 *
 * // Pass to CardRenderer constructor
 * const renderer = new CardRenderer(textRenderer, assetsPath, false, customConfig);
 * ```
 */

// Valid parent keys for position references
export type ParentKey =
  | 'card'
  | 'costFrame'
  | 'descriptionArea'
  | 'imageFrame'
  | 'icon'
  | 'awakeFrame';

// Position with optional parent reference
export interface PositionWithParent {
  x: number;
  y: number;
  parent?: ParentKey;
}

export interface CardLayoutConfig {
  // Canvas/SVG dimensions
  canvas: {
    width: number;
    height: number;
  };

  // Card dimensions and position
  card: {
    width: number;
    height: number;
    // Position (absolute, no parent - shifts entire card)
    position: { x: number; y: number };
  };

  // Cost frame settings (child of card)
  costFrame: {
    // Position (with optional parent reference, defaults to card)
    position: PositionWithParent;
    // Scale multiplier
    scale: number;
    // Base size (before scaling)
    baseSize: number;
  };

  // Image frame settings (child of card)
  imageFrame: {
    // Position (with optional parent reference, defaults to card)
    position: PositionWithParent;
    // Size
    width: number;
    height: number;
  };

  // Icon settings (child of card)
  icon: {
    // Position (with optional parent reference, defaults to card)
    position: PositionWithParent;
    // Size
    size: number;
  };

  // Name text settings
  nameText: {
    // Position (with optional parent reference)
    position: PositionWithParent;
    // Font size
    fontSize: number;
    // Text fill color
    fillColor: string;
    // Outline color (optional - if missing or offset is 0, renders plain text)
    outlineColor?: string;
    // Outline offset distance in pixels (optional - if missing or 0, renders plain text)
    offset?: number;
  };

  // Cost text settings
  costText: {
    // Position (with optional parent reference)
    position: PositionWithParent;
    // Font size
    fontSize: number;
    // Text fill color
    fillColor: string;
    // Outline color (optional - if missing or offset is 0, renders plain text)
    // Can be overridden by category-specific colors
    outlineColor?: string;
    // Outline offset distance in pixels (optional - if missing or 0, renders plain text)
    offset?: number;
  };

  // Description area settings (child of card)
  descriptionArea: {
    // Position (with optional parent reference, defaults to card)
    position: PositionWithParent;
    // Size
    width: number;
    height: number;
  };

  // Description text settings
  descriptionText: {
    // Position (with optional parent reference)
    position: PositionWithParent;
    // Font size
    fontSize: number;
    // Text fill color
    fillColor: string;
    // Maximum width for text wrapping
    maxWidth: number;
    // Line height (spacing between lines)
    lineHeight: number;
  };

  // Awake frame settings (child of card)
  awakeFrame: {
    // Position (with optional parent reference, defaults to card)
    position: PositionWithParent;
    // Size
    size: number;
  };

  // Awake text settings
  awakeText: {
    // Position (with optional parent reference)
    position: PositionWithParent;
    // Font size for awake value
    fontSize: number;
    // Text fill color
    fillColor: string;
    // Outline color (optional - if missing or offset is 0, renders plain text)
    outlineColor?: string;
    // Outline offset distance in pixels (optional - if missing or 0, renders plain text)
    offset?: number;
  };

  // Styling
  styling: {
    // Card frame drop shadow
    cardFrameShadow: string;
  };
}

/**
 * Default card layout configuration
 * Values extracted from Cocos Creator prefab
 */
export const defaultCardLayoutConfig: CardLayoutConfig = {
  canvas: {
    width: 314,
    height: 442,
  },

  card: {
    position: { x: 8, y: 10 }, // Absolute position - shift entire card by changing this
    width: 298,
    height: 426,
  },

  costFrame: {
    position: { x: -113.038, y: 177.279, parent: 'card' }, // Child of card
    scale: 1.2,
    baseSize: 70,
  },

  costText: {
    position: { x: 0, y: 5, parent: 'costFrame' }, // Relative to cost frame center
    fontSize: 50,
    fillColor: '#F9F5C6',
    outlineColor: '#576881', // Will be overridden by category-specific colors
    offset: 1,
  },

  imageFrame: {
    position: { x: 0, y: 69.433, parent: 'card' }, // Child of card
    width: 266,
    height: 267,
  },

  awakeFrame: {
    position: { x: 0, y: 9.956, parent: 'card' }, // Child of card
    size: 69,
  },

  awakeText: {
    position: { x: 0, y: 5, parent: 'awakeFrame' }, // Child of awakeFrame (from prefab)
    fontSize: 30,
    fillColor: '#F9F5C6',
    outlineColor: '#576881',
    offset: 1,
  },

  icon: {
    position: { x: 0, y: 70, parent: 'card' }, // Child of card
    size: 225,
  },

  descriptionArea: {
    position: { x: -2.678, y: -93.129, parent: 'card' }, // Child of card
    width: 319,
    height: 189,
  },

  nameText: {
    position: { x: 0, y: 70, parent: 'descriptionArea' }, // Relative to description area center
    fontSize: 32,
    fillColor: '#FEFFCF',
    outlineColor: '#73663F',
    offset: 1,
  },

  descriptionText: {
    position: { x: 2.868, y: -17, parent: 'descriptionArea' }, // Relative to description area center
    fontSize: 25,
    fillColor: '#25200D',
    maxWidth: 205, // Maximum width for text wrapping
    lineHeight: 25, // Line height (spacing between lines)
  },

  styling: {
    cardFrameShadow: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
  },
};
