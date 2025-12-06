import { CardData, CARD_CATEGORY_FRAMES, CARD_CATEGORY_NAMES } from './types';
import { TextRenderer } from './textRenderer';
import {
  CardLayoutConfig,
  defaultCardLayoutConfig,
  PositionWithParent,
  ParentKey,
} from './cardLayoutConfig';
import { AssetCache } from './assetCache';
import * as path from 'path';
import * as fs from 'fs';

export class CardRenderer {
  private textRenderer: TextRenderer;
  private assetsPath: string;
  private useBase64: boolean;
  private layoutConfig: CardLayoutConfig;
  private assetCache: AssetCache | null;

  constructor(
    textRenderer: TextRenderer,
    assetsPath: string,
    useBase64: boolean = false,
    layoutConfig: CardLayoutConfig = defaultCardLayoutConfig,
    assetCache: AssetCache | null = null
  ) {
    this.textRenderer = textRenderer;
    this.assetsPath = assetsPath;
    this.useBase64 = useBase64;
    this.layoutConfig = layoutConfig;
    this.assetCache = assetCache;
  }

  /**
   * Convert SVG content to a data URI for use in <image> tag
   * @param svgContent - Complete SVG string
   * @param useBase64 - Whether to use base64 encoding (default: false, uses URL encoding)
   * @returns Data URI string that can be used in <image href="...">
   */
  static svgToDataUri(svgContent: string, useBase64: boolean = false): string {
    const svg = svgContent.trim();
    
    if (useBase64) {
      // Base64 encoding (more compact, but requires base64 encoding)
      const base64 = Buffer.from(svg, 'utf-8').toString('base64');
      return `data:image/svg+xml;base64,${base64}`;
    } else {
      // URL encoding (more readable, works directly)
      const encoded = encodeURIComponent(svg);
      return `data:image/svg+xml;charset=utf-8,${encoded}`;
    }
  }

  /**
   * Render card as data URI for embedding in <image> tag
   * @param card - Card data to render
   * @param useBase64 - Whether to use base64 encoding (default: false)
   * @returns Data URI string ready for <image href="...">
   */
  renderCardAsDataUri(card: CardData, useBase64: boolean = false): string {
    const svg = this.renderCard(card);
    return CardRenderer.svgToDataUri(svg, useBase64);
  }

  /**
   * Render a complete card as SVG
   */
  renderCard(card: CardData): string {
    const category = card.category;
    const frameConfig = CARD_CATEGORY_FRAMES[category] || CARD_CATEGORY_FRAMES[0];
    const categoryName = CARD_CATEGORY_NAMES[category] || 'strike';

    // Get layout config
    const config = this.layoutConfig;

    // Card dimensions
    const cardWidth = config.card.width;
    const cardHeight = config.card.height;

    // Card position (absolute, shifts entire card)
    const cardPositionX = config.card.position.x;
    const cardPositionY = config.card.position.y;

    // Card center (relative to card's top-left, then offset by card position)
    const cardCenterX = cardWidth / 2 + cardPositionX;
    const cardCenterY = cardHeight / 2 + cardPositionY;

    // Cocos Creator to SVG coordinate conversion
    // Cocos: (0,0) at center, Y increases upward
    // SVG: (0,0) at top-left, Y increases downward
    // Conversion: SVG(x, y) = (cardCenterX + cocosX, cardCenterY - cocosY)

    // Frame image paths
    const frameImagePath = this.getAssetPath(`card/${frameConfig.frame}.png`);
    const costFrameImagePath = this.getAssetPath(`card/${frameConfig.costFrame}.png`);
    const imageFramePath = this.getAssetPath('card/imageFrame.png');
    const descriptionAreaPath = this.getAssetPath('card/descriptionArea.png');

    // Icon path
    const iconName = this.getCardIconName(card.name);
    const iconPath = this.getAssetPath(`card/icon/${categoryName}/${iconName}.png`);

    // Dynamic hierarchy resolution system
    // Builds element centers map and resolves positions by following parent chains

    type ElementKey = ParentKey | 'card';
    type ElementCenters = Map<ElementKey, { x: number; y: number }>;

    const elementCenters: ElementCenters = new Map();
    elementCenters.set('card', { x: cardCenterX, y: cardCenterY });

    // Recursively resolve position by following parent chain
    const resolvePosition = (pos: PositionWithParent): { x: number; y: number } => {
      if (pos.parent) {
        // Position is relative to parent's center (Cocos coordinates)
        const parentCenter = getElementCenter(pos.parent);
        return {
          x: parentCenter.x + pos.x,
          y: parentCenter.y - pos.y, // Invert Y for Cocos to SVG conversion
        };
      } else {
        // No parent - absolute position (no relation, use x, y directly in SVG coordinates)
        return {
          x: pos.x,
          y: pos.y,
        };
      }
    };

    // Helper to get element center, calculating it if not already computed
    // Uses resolvePosition to follow parent chain dynamically
    const getElementCenter = (key: ElementKey): { x: number; y: number } => {
      if (elementCenters.has(key)) {
        return elementCenters.get(key)!;
      }

      let center: { x: number; y: number };

      switch (key) {
        case 'card': {
          center = { x: cardCenterX, y: cardCenterY };
          break;
        }
        case 'costFrame': {
          const pos = resolvePosition(config.costFrame.position);
          const size = config.costFrame.baseSize * config.costFrame.scale;
          center = { x: pos.x, y: pos.y }; // Center is at resolved position
          break;
        }
        case 'imageFrame': {
          const pos = resolvePosition(config.imageFrame.position);
          center = { x: pos.x, y: pos.y }; // Center is at resolved position
          break;
        }
        case 'icon': {
          const pos = resolvePosition(config.icon.position);
          center = { x: pos.x, y: pos.y }; // Center is at resolved position
          break;
        }
        case 'descriptionArea': {
          const pos = resolvePosition(config.descriptionArea.position);
          center = { x: pos.x, y: pos.y }; // Center is at resolved position
          break;
        }
        case 'awakeFrame': {
          const pos = resolvePosition(config.awakeFrame.position);
          center = { x: pos.x, y: pos.y }; // Center is at resolved position
          break;
        }
        default:
          throw new Error(`Unknown element key: ${key}`);
      }

      elementCenters.set(key, center);
      return center;
    };

    // Pre-calculate all element centers (for SVG rendering)
    getElementCenter('costFrame');
    getElementCenter('imageFrame');
    getElementCenter('icon');
    getElementCenter('descriptionArea');
    getElementCenter('awakeFrame');

    // Resolve text positions using the flexible hierarchy system
    const costTextPos = resolvePosition(config.costText.position);
    const costTextSvgX = costTextPos.x;
    const costTextSvgY = costTextPos.y;

    const nameTextPos = resolvePosition(config.nameText.position);
    const nameTextSvgX = nameTextPos.x;
    const nameTextSvgY = nameTextPos.y;

    const descriptionTextPos = resolvePosition(config.descriptionText.position);
    const descriptionTextSvgX = descriptionTextPos.x;
    const descriptionTextSvgY = descriptionTextPos.y;

    // Get element centers for SVG rendering (already calculated)
    const costFrameCenter = getElementCenter('costFrame');
    const costFrameSvgX =
      costFrameCenter.x - (config.costFrame.baseSize * config.costFrame.scale) / 2;
    const costFrameSvgY =
      costFrameCenter.y - (config.costFrame.baseSize * config.costFrame.scale) / 2;
    const costFrameSvgSize = config.costFrame.baseSize * config.costFrame.scale;

    const imageFrameCenter = getElementCenter('imageFrame');
    const imageFrameSvgX = imageFrameCenter.x - config.imageFrame.width / 2;
    const imageFrameSvgY = imageFrameCenter.y - config.imageFrame.height / 2;
    const imageFrameWidth = config.imageFrame.width;
    const imageFrameHeight = config.imageFrame.height;

    const iconCenter = getElementCenter('icon');
    const iconSvgX = iconCenter.x - config.icon.size / 2;
    const iconSvgY = iconCenter.y - config.icon.size / 2;
    const iconSize = config.icon.size;

    const descriptionAreaCenter = getElementCenter('descriptionArea');
    const descriptionAreaSvgX = descriptionAreaCenter.x - config.descriptionArea.width / 2;
    const descriptionAreaSvgY = descriptionAreaCenter.y - config.descriptionArea.height / 2;
    const descriptionAreaWidth = config.descriptionArea.width;
    const descriptionAreaHeight = config.descriptionArea.height;

    const awakeFrameCenter = getElementCenter('awakeFrame');
    const awakeFrameSvgX = awakeFrameCenter.x - config.awakeFrame.size / 2;
    const awakeFrameSvgY = awakeFrameCenter.y - config.awakeFrame.size / 2;
    const awakeFrameSize = config.awakeFrame.size;

    // Awake text position (relative to awakeFrame)
    const awakeTextPos = resolvePosition(config.awakeText.position);
    const awakeTextSvgX = awakeTextPos.x;
    const awakeTextSvgY = awakeTextPos.y;

    // Format card name (convert "Strike" to "Strike")
    const cardName = this.formatCardName(card.name);

    // Format cost
    const costText = card.cost === 255 ? 'x' : card.cost.toString();

    // Get canvas dimensions from config
    const canvasWidth = config.canvas.width;
    const canvasHeight = config.canvas.height;

    // Build SVG content (without defs - will be added conditionally)
    const svgContent = `
  <!-- Card Frame -->
  <image href="${frameImagePath}" x="${cardPositionX}" y="${cardPositionY}" width="${cardWidth}" height="${cardHeight}" class="card-frame"/>
  
  <!-- Card Icon -->
  <image href="${iconPath}" x="${iconSvgX}" y="${iconSvgY}" width="${iconSize}" height="${iconSize}"/>
  
  <!-- Image Frame -->
  <image href="${imageFramePath}" x="${imageFrameSvgX}" y="${imageFrameSvgY}" width="${imageFrameWidth}" height="${imageFrameHeight}"/>

  <!-- Awake Value (if present) -->
  ${
    card.awake && card.awake.value
      ? `
  <g id="card-awake">
    <image href="${this.getAssetPath('card/awakeFrame.png')}" x="${awakeFrameSvgX}" y="${awakeFrameSvgY}" width="${awakeFrameSize}" height="${awakeFrameSize}"/>
    ${this.textRenderer.renderFramedText(
      card.awake.value.toString(),
      config.awakeText.fontSize,
      awakeTextSvgX,
      awakeTextSvgY,
      config.awakeText.fillColor,
      config.awakeText.outlineColor,
      config.awakeText.offset,
      true
    )}
  </g>
  `
      : ''
  }
  
  <!-- Cost Frame (top-left corner) -->
  <image href="${costFrameImagePath}" x="${costFrameSvgX}" y="${costFrameSvgY}" width="${costFrameSvgSize}" height="${costFrameSvgSize}"/>
  
  <!-- Description Area Background -->
  <image href="${descriptionAreaPath}" x="${descriptionAreaSvgX}" y="${descriptionAreaSvgY}" width="${descriptionAreaWidth}" height="${descriptionAreaHeight}"/>
  
  <!-- Card Name (FramedFont with outline, on banner below image) -->
  <g id="card-name">
    ${this.textRenderer.renderFramedText(
      cardName,
      config.nameText.fontSize,
      nameTextSvgX,
      nameTextSvgY,
      config.nameText.fillColor,
      config.nameText.outlineColor,
      config.nameText.offset,
      true // Use bold font
    )}
  </g>
  
  <!-- Cost (FramedFont with outline, centered in cost frame) -->
  <g id="card-cost">
    ${this.textRenderer.renderFramedText(
      costText,
      config.costText.fontSize,
      costTextSvgX,
      costTextSvgY,
      config.costText.fillColor,
      config.costText.outlineColor,
      config.costText.offset,
      true // Use bold font
    )}
  </g>
  
  <!-- Description (RichText, in description area) -->
  <g id="card-description">
    ${this.textRenderer.renderDescription(card.description, config.descriptionText.fontSize, descriptionTextSvgX, descriptionTextSvgY, config.descriptionText.maxWidth, config.descriptionText.fillColor, config.descriptionText.lineHeight)}
  </g>
`.trim();

    // Build defs section
    const defsSection = `
  <defs>
    <style>
      .card-frame { filter: ${config.styling.cardFrameShadow}; }
    </style>
  </defs>`;

    // Return complete SVG with root tag
    return `<svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
${defsSection}
${svgContent}
</svg>`.trim();
  }

  /**
   * Get asset path or base64 data URI
   * Uses asset cache if available, otherwise falls back to disk I/O
   */
  private getAssetPath(relativePath: string): string {
    // If asset cache is available, use it (no I/O overhead)
    if (this.assetCache) {
      return this.assetCache.get(relativePath);
    }

    // Fallback to disk I/O (for CLI usage or when cache is not available)
    if (this.useBase64) {
      return this.getBase64DataUri(relativePath);
    }
    // Return relative path from build output to assets
    // Adjust this based on where your SVG will be served from
    // Note: When using local assets, this path may need adjustment
    return `assets/${relativePath}`;
  }

  /**
   * Convert PNG file to base64 data URI (fallback when cache is not available)
   */
  private getBase64DataUri(relativePath: string): string {
    const fullPath = path.join(this.assetsPath, relativePath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`Warning: Image not found: ${fullPath}, using placeholder`);
      // Return a transparent 1x1 PNG as fallback
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    }

    try {
      const imageBuffer = fs.readFileSync(fullPath);
      const base64 = imageBuffer.toString('base64');
      // Determine MIME type from file extension
      const mimeType = relativePath.endsWith('.png')
        ? 'image/png'
        : relativePath.endsWith('.jpg') || relativePath.endsWith('.jpeg')
          ? 'image/jpeg'
          : 'image/png'; // default to PNG
      return `data:${mimeType};base64,${base64}`;
    } catch (error) {
      console.warn(`Warning: Failed to read image ${fullPath}:`, error);
      // Return transparent 1x1 PNG as fallback
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    }
  }

  /**
   * Format card name (convert enum name to display name)
   */
  private formatCardName(name: string): string {
    // Convert "PizzaDay" to "Pizza Day", "Strike" stays "Strike"
    return name.replace(/([A-Z])/g, ' $1').trim();
  }

  /**
   * Get card icon filename from card name
   */
  private getCardIconName(cardName: string): string {
    // Card names match icon filenames directly
    return cardName;
  }
}
