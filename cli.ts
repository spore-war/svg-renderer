#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { TextRenderer } from './textRenderer';
import { CardRenderer } from './cardRenderer';
import { loadEngine, getCardByDna } from './engineLoader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get DNA from environment variable or command line argument
const dna = process.env.dna || process.argv[2];

// Check for base64 flag (--base64 or base64=true)
const useBase64 =
  process.env.base64 === 'true' || process.env.base64 === '1' || process.argv.includes('--base64');

if (!dna) {
  console.error('Usage: dna=<DNA_HEX> pnpm run svg [--base64]');
  console.error('   or: pnpm run svg <DNA_HEX> [--base64]');
  console.error('   or: base64=true dna=<DNA_HEX> pnpm run svg');
  console.error('\nExample: dna=7b1f0000000000000000 pnpm run svg');
  console.error('Example: dna=7b1f0000000000000000 pnpm run svg --base64');
  console.error('Example: base64=true dna=7b1f0000000000000000 pnpm run svg');
  console.error('\nNote: DNA must be a hexadecimal string');
  console.error('      --base64 flag embeds images as base64 data URIs (standalone SVG)');
  process.exit(1);
}

async function main() {
  try {
    // Paths - using local assets in svg-renderer directory
    const assetsPath = path.join(__dirname, 'assets');
    const fontsPath = path.join(assetsPath, 'font');
    const wasmPath = path.join(assetsPath, 'engine', 'wasm.bin');
    const engineJsPath = path.join(assetsPath, 'engine', 'index.js');
    const projectRoot = path.resolve(__dirname, '../..');
    const outputPath = process.env.output || path.join(projectRoot, 'build', 'cards');

    console.log(`Rendering card with DNA: ${dna}`);
    console.log(`Assets path: ${assetsPath}`);
    console.log(`Output path: ${outputPath}`);
    if (useBase64) {
      console.log(`Base64 embedding: enabled (standalone SVG)`);
    }

    // Load fonts
    console.log('Loading fonts...');
    const textRenderer = new TextRenderer();
    await textRenderer.loadFonts(fontsPath);

    // Load engine
    console.log('Loading WASM engine...');
    let engine;
    try {
      engine = await loadEngine(wasmPath, engineJsPath);
    } catch (error: any) {
      console.error('Failed to load WASM engine:', error.message);
      console.error('\nNote: WASM loading in Node.js may require additional setup.');
      console.error('The engine module may need to be adapted for Node.js environment.');
      console.error(
        'You may need to use a WASM loader like @wasm-tool/wasm-pack-plugin or similar.'
      );
      throw error;
    }

    // Get card by DNA
    console.log(`Getting card by DNA: ${dna}...`);
    const cardData = getCardByDna(engine, dna);

    if (!cardData) {
      console.error(`Card with DNA "${dna}" not found!`);
      console.error('\nMake sure the DNA is a valid hexadecimal string.');
      console.error('Example DNA format: 7b1f0000000000000000');
      process.exit(1);
    }

    console.log(`Found card: ${cardData.name}`);
    console.log(`  Category: ${cardData.category}`);
    console.log(`  Cost: ${cardData.cost}`);
    console.log(`  Description: ${cardData.description.substring(0, 50)}...`);

    // Render card
    console.log('Rendering SVG...');
    const cardRenderer = new CardRenderer(textRenderer, assetsPath, useBase64);
    const svg = cardRenderer.renderCard(cardData);

    // Generate output filename from DNA if not specified
    let finalOutputPath: string;
    if (outputPath.includes('.svg')) {
      // User specified full path with filename
      finalOutputPath = outputPath;
    } else {
      // User specified directory or default - append filename
      finalOutputPath = path.join(outputPath, `${dna.replace(/\s/g, '_')}.svg`);
    }

    // Ensure output directory exists
    const outputDir = path.dirname(finalOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write SVG file
    fs.writeFileSync(finalOutputPath, svg, 'utf-8');
    console.log(`\n✓ Card rendered successfully!`);
    console.log(`  Output: ${finalOutputPath}`);
  } catch (error) {
    console.error('Error rendering card:', error);
    process.exit(1);
  }
}

main();
