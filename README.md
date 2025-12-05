# SVG Card Renderer

A standalone module for rendering WarSporeSaga cards as SVG images outside of Cocos Creator.

## Features

- **Text-to-Path Conversion**: Uses `opentype.js` to convert text to SVG paths, eliminating font dependencies
- **WASM Integration**: Retrieves card data from the game's WASM engine
- **Pixel-Perfect Rendering**: Matches the exact card appearance from the game prefab

## Installation

```bash
cd scripts/svg-renderer
pnpm install
```

## Usage

### Render a specific card by DNA:

```bash
# From project root
dna=7b1f0000000000000000 pnpm run svg

# Or with output path
dna=7b1f0000000000000000 output=./output/card.svg pnpm run svg

# DNA can also be passed as command line argument
pnpm run svg 7b1f0000000000000000

# With base64 embedding (standalone SVG, no external image dependencies)
dna=7b1f0000000000000000 pnpm run svg --base64
# Or using environment variable
base64=true dna=7b1f0000000000000000 pnpm run svg
```

### DNA Format

DNA must be a hexadecimal string. Examples:

- `7b1f0000000000000000`
- `0x7b1f0000000000000000` (with 0x prefix, will be stripped)
- Spaces are allowed and will be removed: `7b 1f 00 00 00 00 00 00 00 00`

### Finding Card DNA

You can find card DNA values by:

1. Scanning the project codebase for DNA usage
2. Using `getDefaultDnaCollection()` from the engine
3. Extracting from game save data or transactions

## Output

SVG files are generated in `build/cards/` by default, or in the path specified by the `output` environment variable.

## Base64 Embedding

By default, SVG files use relative paths to image assets. For standalone SVGs that don't depend on external files, use the `--base64` flag:

```bash
dna=7b1f0000000000000000 pnpm run svg --base64
```

This embeds all PNG images as base64 data URIs directly in the SVG, making it completely self-contained. The file size will be larger, but the SVG can be used anywhere without needing the asset files.

## Architecture

- **textRenderer.ts**: Handles text-to-path conversion using opentype.js
- **cardRenderer.ts**: Composes the complete SVG card with frames, icons, and text
- **engineLoader.ts**: Loads and interfaces with the WASM engine to get card data
- **cli.ts**: Command-line interface for generating cards

## Dependencies

- `opentype.js`: Font parsing and path conversion
- `tsx`: TypeScript execution for Node.js
- `typescript`: Type checking and compilation

## WASM Loading Notes

The WASM engine module (`assets/scripts/sdk/engine/index.js`) is designed for browser environments.
For Node.js usage, you may need to:

1. **Use a WASM-compatible runtime**: Consider using `@wasm-tool/wasm-pack-plugin` or similar
2. **Adapt the engine loader**: The `engineLoader.ts` may need adjustments based on your WASM build
3. **Alternative approach**: Pre-extract card data to JSON and use that instead of WASM

If WASM loading fails, you can modify `engineLoader.ts` to use a pre-generated card data JSON file instead.
