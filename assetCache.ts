import * as path from 'path';
import * as fs from 'fs';
import { CARD_CATEGORY_FRAMES, CARD_CATEGORY_NAMES } from './types';

/**
 * Asset cache that pre-loads all card assets into memory
 * Eliminates I/O overhead by caching all images as base64 data URIs
 */
export class AssetCache {
  private cache: Map<string, string> = new Map();
  private assetsPath: string;

  constructor(assetsPath: string) {
    this.assetsPath = assetsPath;
  }

  /**
   * Pre-load all card assets into memory
   */
  async loadAll(): Promise<void> {
    console.log('Loading all assets into memory cache...');
    const startTime = Date.now();

    // Load common assets
    await this.loadCommonAssets();

    // Load category-specific frames
    await this.loadCategoryFrames();

    // Load all card icons
    await this.loadAllIcons();

    const duration = Date.now() - startTime;
    console.log(`✓ Loaded ${this.cache.size} assets into memory cache (${duration}ms)`);
  }

  /**
   * Load common assets (used by all cards)
   */
  private async loadCommonAssets(): Promise<void> {
    const commonAssets = [
      'card/imageFrame.png',
      'card/descriptionArea.png',
      'card/awakeFrame.png',
    ];

    for (const asset of commonAssets) {
      await this.loadAsset(asset);
    }
  }

  /**
   * Load category-specific frame assets
   */
  private async loadCategoryFrames(): Promise<void> {
    const categories = Object.keys(CARD_CATEGORY_FRAMES).map(Number);

    for (const category of categories) {
      const frameConfig = CARD_CATEGORY_FRAMES[category];
      
      // Load frame
      await this.loadAsset(`card/${frameConfig.frame}.png`);
      
      // Load cost frame
      await this.loadAsset(`card/${frameConfig.costFrame}.png`);
    }
  }

  /**
   * Load all card icons from all categories
   */
  private async loadAllIcons(): Promise<void> {
    const categories = Object.keys(CARD_CATEGORY_NAMES).map(Number);

    for (const category of categories) {
      const categoryName = CARD_CATEGORY_NAMES[category];
      const iconDir = path.join(this.assetsPath, 'card', 'icon', categoryName);

      if (!fs.existsSync(iconDir)) {
        console.warn(`Warning: Icon directory not found: ${iconDir}`);
        continue;
      }

      try {
        const files = fs.readdirSync(iconDir);
        const pngFiles = files.filter(f => f.endsWith('.png'));

        for (const file of pngFiles) {
          const relativePath = `card/icon/${categoryName}/${file}`;
          await this.loadAsset(relativePath);
        }
      } catch (error) {
        console.warn(`Warning: Failed to read icon directory ${iconDir}:`, error);
      }
    }
  }

  /**
   * Load a single asset and cache it as base64 data URI
   */
  private async loadAsset(relativePath: string): Promise<void> {
    const fullPath = path.join(this.assetsPath, relativePath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`Warning: Asset not found: ${fullPath}, will use placeholder`);
      // Cache placeholder instead
      this.cache.set(relativePath, this.getPlaceholderDataUri());
      return;
    }

    try {
      const imageBuffer = await fs.promises.readFile(fullPath);
      const base64 = imageBuffer.toString('base64');
      
      // Determine MIME type from file extension
      const mimeType = relativePath.endsWith('.png')
        ? 'image/png'
        : relativePath.endsWith('.jpg') || relativePath.endsWith('.jpeg')
          ? 'image/jpeg'
          : 'image/png'; // default to PNG

      const dataUri = `data:${mimeType};base64,${base64}`;
      this.cache.set(relativePath, dataUri);
    } catch (error) {
      console.warn(`Warning: Failed to load asset ${fullPath}:`, error);
      // Cache placeholder on error
      this.cache.set(relativePath, this.getPlaceholderDataUri());
    }
  }

  /**
   * Get cached asset as data URI
   * Returns cached value or placeholder if not found
   */
  get(relativePath: string): string {
    const cached = this.cache.get(relativePath);
    if (cached) {
      return cached;
    }

    // If not cached, return placeholder (shouldn't happen if loadAll was called)
    console.warn(`Warning: Asset not in cache: ${relativePath}, using placeholder`);
    return this.getPlaceholderDataUri();
  }

  /**
   * Check if an asset is cached
   */
  has(relativePath: string): boolean {
    return this.cache.has(relativePath);
  }

  /**
   * Get placeholder data URI (transparent 1x1 PNG)
   */
  private getPlaceholderDataUri(): string {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

