import express from 'express';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { TextRenderer } from './textRenderer';
import { CardRenderer } from './cardRenderer';
import { loadEngine, getCardByDna } from './engineLoader';
import { AssetCache } from './assetCache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Enable CORS for all origins
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Paths - using local assets in svg-renderer directory
const assetsPath = path.join(__dirname, 'assets');
const fontsPath = path.join(assetsPath, 'font');
const wasmPath = path.join(assetsPath, 'engine', 'wasm.bin');
const engineJsPath = path.join(assetsPath, 'engine', 'index.js');
const iconPath = path.join(assetsPath, 'icon');

// Initialize renderer components (load once, reuse for all requests)
let textRenderer: TextRenderer | null = null;
let engine: any = null;
let cardRenderer: CardRenderer | null = null;
let assetCache: AssetCache | null = null;
let isInitializing = false;
let initPromise: Promise<void> | null = null;

/**
 * Initialize the renderer components
 * This is called once on startup or lazily on first request
 */
async function initialize(): Promise<void> {
  // If already initialized, return immediately
  if (textRenderer && engine && cardRenderer && assetCache) {
    return;
  }

  // If initialization is in progress, wait for it
  if (isInitializing && initPromise) {
    return initPromise;
  }

  // Start initialization
  isInitializing = true;
  initPromise = (async () => {
    try {
      console.log('Initializing renderer components...');

      // Load fonts
      console.log('Loading fonts...');
      textRenderer = new TextRenderer();
      await textRenderer.loadFonts(fontsPath);

      // Load engine
      console.log('Loading WASM engine...');
      engine = await loadEngine(wasmPath, engineJsPath);

      // Pre-load all assets into memory cache (eliminates I/O overhead)
      console.log('Pre-loading assets into memory cache...');
      assetCache = new AssetCache(assetsPath);
      await assetCache.loadAll();

      // Create card renderer with asset cache (use base64 for standalone SVGs)
      cardRenderer = new CardRenderer(textRenderer, assetsPath, true, undefined, assetCache);

      console.log('✓ Renderer initialized successfully!');
    } catch (error: any) {
      console.error('Failed to initialize renderer:', error);
      // Reset state so we can retry
      textRenderer = null;
      engine = null;
      cardRenderer = null;
      assetCache = null;
      throw error;
    } finally {
      isInitializing = false;
    }
  })();

  return initPromise;
}

// Initialize on startup
initialize().catch(error => {
  console.error('Failed to initialize renderer on startup:', error);
  console.error('Server will attempt to initialize on first request');
});

/**
 * GET /render?dna=<DNA_HEX>
 * Returns SVG image of the card with the given DNA
 */
app.get('/render', async (req, res) => {
  try {
    // Ensure renderer is initialized
    await initialize();

    const dna = req.query.dna as string;

    if (!dna) {
      return res.status(400).json({
        error: 'Missing DNA parameter',
        message: 'Please provide a DNA parameter in the query string',
        example: '/render?dna=cace27999bb78e7a1c00',
      });
    }

    // Validate DNA format (hexadecimal string)
    if (!dna.match(/^[0-9a-fA-F\s]+$/)) {
      return res.status(400).json({
        error: 'Invalid DNA format',
        message: 'DNA must be a hexadecimal string',
        example: 'cace27999bb78e7a1c00',
      });
    }

    // Get card data by DNA
    const cardData = getCardByDna(engine, dna);

    if (!cardData) {
      return res.status(404).json({
        error: 'Card not found',
        message: `No card found with DNA "${dna}"`,
        example: 'cace27999bb78e7a1c00',
      });
    }

    // Render SVG (always returns complete SVG with root tag)
    const svg = cardRenderer!.renderCard(cardData);

    // Return SVG directly
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.setHeader('X-Card-Name', cardData.name);
    res.setHeader('X-Card-Category', cardData.category.toString());

    // Send SVG
    res.send(svg);
  } catch (error: any) {
    console.error('Error rendering card:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred',
    });
  }
});

/**
 * GET /embed?dna=<DNA_HEX>[&base64=true]
 * Returns SVG card as data URI for embedding in <image> tag
 */
app.get('/embed', async (req, res) => {
  try {
    // Ensure renderer is initialized
    await initialize();

    const dna = req.query.dna as string;

    if (!dna) {
      return res.status(400).json({
        error: 'Missing DNA parameter',
        message: 'Please provide a DNA parameter in the query string',
        example: '/embed?dna=cace27999bb78e7a1c00',
      });
    }

    // Validate DNA format (hexadecimal string)
    if (!dna.match(/^[0-9a-fA-F\s]+$/)) {
      return res.status(400).json({
        error: 'Invalid DNA format',
        message: 'DNA must be a hexadecimal string',
        example: 'cace27999bb78e7a1c00',
      });
    }

    // Get card data by DNA
    const cardData = getCardByDna(engine, dna);

    if (!cardData) {
      return res.status(404).json({
        error: 'Card not found',
        message: `No card found with DNA "${dna}"`,
        example: 'cace27999bb78e7a1c00',
      });
    }

    // Render SVG (always returns complete SVG with root tag)
    const svg = cardRenderer!.renderCard(cardData);

    // Convert to data URI (for embedding in <image> tag)
    const useBase64 = req.query.base64 === 'true' || req.query.base64 === '1';
    const dataUri = CardRenderer.svgToDataUri(svg, useBase64);
    
    // Return data URI directly as plain text
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('X-Card-Name', cardData.name);
    res.setHeader('X-Card-Category', cardData.category.toString());
    res.send(dataUri);
  } catch (error: any) {
    console.error('Error embedding card:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'An unexpected error occurred',
    });
  }
});

/**
 * GET /health
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  const isReady = textRenderer !== null && engine !== null && cardRenderer !== null && assetCache !== null;
  const response: any = {
    status: isReady ? 'ready' : 'initializing',
    timestamp: new Date().toISOString(),
  };

  if (isReady && assetCache) {
    const stats = assetCache.getStats();
    response.cache = {
      assetsLoaded: stats.size,
    };
  }

  res.json(response);
});

/**
 * GET /icon/blindbox
 * Returns the blindbox icon image
 */
app.get('/icon/blindbox', (req, res) => {
  const filePath = path.join(iconPath, 'blindbox.png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving blindbox icon:', err);
      res.status(404).json({
        error: 'Icon not found',
        message: 'blindbox.png not found',
      });
    }
  });
});

/**
 * GET /icon/logo
 * Returns the logo image
 */
app.get('/icon/logo', (req, res) => {
  const filePath = path.join(iconPath, 'logo.png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving logo icon:', err);
      res.status(404).json({
        error: 'Icon not found',
        message: 'logo.png not found',
      });
    }
  });
});

/**
 * GET /
 * API information endpoint
 */
app.get('/', (req, res) => {
  res.json({
    service: 'Card SVG Renderer',
    version: '1.0.0',
    endpoints: {
      render: {
        method: 'GET',
        path: '/render',
        description: 'Render a card as SVG by DNA',
        parameters: {
          dna: {
            type: 'string',
            required: true,
            description: 'Card DNA in hexadecimal format',
            example: 'cace27999bb78e7a1c00',
          },
        },
        example: '/render?dna=cace27999bb78e7a1c00',
      },
      embed: {
        method: 'GET',
        path: '/embed',
        description: 'Get card SVG as data URI string for embedding in <image> tag. Returns plain text (data URI string).',
        responseType: 'text/plain',
        parameters: {
          dna: {
            type: 'string',
            required: true,
            description: 'Card DNA in hexadecimal format',
            example: 'cace27999bb78e7a1c00',
          },
          base64: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Use base64 encoding (default: URL encoding)',
            example: '/embed?dna=cace27999bb78e7a1c00&base64=true',
          },
        },
        examples: [
          '/embed?dna=cace27999bb78e7a1c00',
          '/embed?dna=cace27999bb78e7a1c00&base64=true',
        ],
        exampleResponse: 'data:image/svg+xml;charset=utf-8,%3Csvg%20...',
      },
      health: {
        method: 'GET',
        path: '/health',
        description: 'Check server health status',
      },
      iconBlindbox: {
        method: 'GET',
        path: '/icon/blindbox',
        description: 'Get the blindbox icon image',
        responseType: 'image/png',
      },
      iconLogo: {
        method: 'GET',
        path: '/icon/logo',
        description: 'Get the logo image',
        responseType: 'image/png',
      },
    },
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Card renderer server running on http://0.0.0.0:${PORT}`);
  console.log(`   Render:  http://localhost:${PORT}/render?dna=cace27999bb78e7a1c00`);
  console.log(`   Embed:   http://localhost:${PORT}/embed?dna=cace27999bb78e7a1c00`);
  console.log(`   Health:  http://localhost:${PORT}/health`);
  console.log(`   Icons:   http://localhost:${PORT}/icon/blindbox | /icon/logo\n`);
});
