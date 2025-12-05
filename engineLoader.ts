import * as fs from 'fs';
import { createRequire } from 'module';
import { CardData } from './types';

const require = createRequire(import.meta.url);

// Type definitions matching the WASM engine
interface EngineCard {
  name: number; // CardName enum value
  cost: number;
  category: number; // CardCategory enum value
  description: string;
  target: number; // CardTarget enum value
  awake?: { value: number };
  golden: boolean;
  exile: boolean;
  tags: number[];
}

interface EngineModule {
  initSync(): void;
  getCardByDna(dna: Uint8Array): EngineCard;
  getDefaultDnaCollection(): Uint8Array[];
  CardName: Record<string, number>;
  CardCategory: Record<string, number>;
}

/**
 * Load and initialize the WASM engine
 */
export async function loadEngine(wasmPath: string, engineJsPath: string): Promise<EngineModule> {
  // Read the WASM file as a buffer
  const wasmBuffer = fs.readFileSync(wasmPath);
  
  // Load the CommonJS module using createRequire
  // This allows us to load CommonJS modules in an ES module context
  const engineModule = require(engineJsPath);
  
  // Get the initSync function
  const initSync = engineModule.initSync;
  
  if (!initSync) {
    // Debug: log what we actually got
    console.error('Available exports:', Object.keys(engineModule));
    console.error('Module type:', typeof engineModule);
    throw new Error('initSync function not found in engine module');
  }
  
  // Initialize WASM with the buffer
  // initSync can take a buffer, ArrayBuffer, or WebAssembly.Module
  // Pass as object to avoid deprecation warning
  initSync({ module: wasmBuffer });
  
  // After initialization, the exports should be available
  const getCardByDnaFunc = engineModule.getCardByDna;
  const getDefaultDnaCollectionFunc = engineModule.getDefaultDnaCollection;
  const CardNameEnum = engineModule.CardName;
  const CardCategoryEnum = engineModule.CardCategory;
  
  // Return a wrapper that has the functions we need
  return {
    initSync: () => {}, // Already initialized
    getCardByDna: getCardByDnaFunc,
    getDefaultDnaCollection: getDefaultDnaCollectionFunc,
    CardName: CardNameEnum,
    CardCategory: CardCategoryEnum,
  } as unknown as EngineModule;
}

/**
 * Convert hex string to Uint8Array
 */
function fromHex(hex: string): Uint8Array {
  if (hex.startsWith('0x')) {
    hex = hex.slice(2);
  }
  // Remove any whitespace
  hex = hex.replace(/\s/g, '');
  if (hex.length % 2 !== 0) {
    hex = '0' + hex;
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Get card by DNA hex string
 */
export function getCardByDna(engine: EngineModule, dnaHex: string): CardData | null {
  try {
    // Validate hex format
    if (!dnaHex.match(/^[0-9a-fA-F\s]+$/)) {
      throw new Error('DNA must be in hex format');
    }

    // Convert hex string to Uint8Array
    const dna = fromHex(dnaHex);

    // Get card from engine
    const card = engine.getCardByDna(dna);

    // Convert CardName enum value to string
    // The enum structure: { "Strike": 33, "33": "Strike", ... }
    // Use the same logic as stringifyEnum in the codebase
    const cardNameEnum = engine.CardName;
    const enumKeys = Object.keys(cardNameEnum).filter(key => isNaN(Number(key)));
    const cardName = enumKeys[card.name] || 'Unknown';

    // Convert to our CardData format
    return {
      name: cardName,
      cost: card.cost,
      category: card.category,
      description: card.description,
      target: card.target,
      awake: card.awake,
      golden: card.golden,
      exile: card.exile,
      tags: card.tags || [],
    };
  } catch (error: any) {
    console.error(`Error getting card by DNA ${dnaHex}:`, error.message);
    return null;
  }
}

