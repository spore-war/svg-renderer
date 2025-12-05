import opentype from 'opentype.js';
import * as fs from 'fs';
import * as path from 'path';

export class TextRenderer {
  private regularFont: opentype.Font | null = null;
  private boldFont: opentype.Font | null = null;

  async loadFonts(fontsPath: string): Promise<void> {
    const regularPath = path.join(fontsPath, 'ComicNeue-Regular.ttf');
    const boldPath = path.join(fontsPath, 'ComicNeue-Bold.ttf');

    if (!fs.existsSync(regularPath) || !fs.existsSync(boldPath)) {
      throw new Error(`Font files not found at ${fontsPath}`);
    }

    this.regularFont = await opentype.load(regularPath);
    this.boldFont = await opentype.load(boldPath);
  }

  /**
   * Calculate vertical center offset for text
   * opentype.js getPath uses Y as baseline, we need to adjust to center
   * In font coordinates: baseline=0, ascender>0 (up), descender<0 (down)
   * Center is at (ascender + descender) / 2 font units above baseline
   * To center text at y, we move baseline down by centerOffset
   */
  private getVerticalCenterOffset(font: opentype.Font, fontSize: number): number {
    // Font metrics in font units
    const ascender = font.ascender || 0;
    const descender = font.descender || 0;
    const unitsPerEm = font.unitsPerEm || 1000;

    // Center offset from baseline in font units
    // Center is at (ascender + descender) / 2 above baseline
    // To place center at y, baseline should be at y - centerOffset
    // So we pass y + centerOffset to getPath (moving baseline down)
    const centerOffsetFontUnits = (ascender + descender) / 2;

    // Convert to pixel units (positive = move baseline down so center moves up)
    return (centerOffsetFontUnits / unitsPerEm) * fontSize;
  }

  /**
   * Render FramedFont text with outline effect (5 layers) or plain text
   * Text is centered at the given position (like Cocos Creator)
   * @param text - Text to render
   * @param fontSize - Font size in pixels
   * @param x - X position (center of text)
   * @param y - Y position (center of text)
   * @param fillColor - Text fill color
   * @param outlineColor - Outline color (optional, if missing renders plain text)
   * @param offset - Outline offset distance (optional, if missing or 0 renders plain text)
   * @param bold - Use bold font (default: false)
   */
  renderFramedText(
    text: string,
    fontSize: number,
    x: number,
    y: number,
    fillColor: string = 'white',
    outlineColor?: string,
    offset?: number,
    bold: boolean = false
  ): string {
    const font = bold ? this.boldFont : this.regularFont;
    if (!font) {
      throw new Error(bold ? 'Bold font not loaded' : 'Regular font not loaded');
    }

    // Calculate text width to center it horizontally (Cocos Creator behavior)
    const textWidth = this.measureText(text, fontSize, bold);
    const centeredX = x - textWidth / 2;

    // Calculate vertical center offset (opentype.js uses baseline, we want center)
    const verticalOffset = this.getVerticalCenterOffset(font, fontSize);
    const centeredY = y + verticalOffset; // Add offset to move baseline down so center is at y

    // If outlineColor or offset is missing/undefined, or offset is 0, render plain text
    if (outlineColor === undefined || offset === undefined || offset === 0) {
      const path = font.getPath(text, centeredX, centeredY, fontSize);
      const pathData = path.toPathData(2);
      return `<path d="${pathData}" fill="${fillColor}"/>`;
    }

    // Render framed text with outline effect (5 layers)
    const offsets = [
      { x: offset, y: offset }, // upRight
      { x: -offset, y: offset }, // upLeft
      { x: offset, y: -offset }, // downRight
      { x: -offset, y: -offset }, // downLeft
      { x: 0, y: 0 }, // center
    ];

    return offsets
      .map((offsetPos, i) => {
        const path = font.getPath(text, centeredX + offsetPos.x, centeredY + offsetPos.y, fontSize);
        // toSVG() returns full path element, we need just the path data
        const pathData = path.toPathData(2);
        const fill = i === 4 ? fillColor : outlineColor;
        return `<path d="${pathData}" fill="${fill}"/>`;
      })
      .join('\n');
  }

  /**
   * Render description text with rich formatting using SVG paths
   * Handles [text] → bold with color #8D3F0B
   * Preserves newline characters as explicit line breaks
   * Uses bold font for all text (matching Cocos Creator)
   * @param defaultColor - Default color for non-highlighted text
   * @param lineHeight - Line height (spacing between lines)
   */
  renderDescription(
    description: string,
    fontSize: number,
    x: number,
    y: number,
    maxWidth: number,
    defaultColor: string = 'rgb(37, 32, 13)',
    lineHeight?: number
  ): string {
    if (!this.boldFont) {
      throw new Error('Bold font not loaded');
    }

    // First, split by newlines to preserve explicit line breaks
    // Normalize different newline formats (\n, \r\n, \r) to \n
    const normalizedDescription = description.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const rawLines = normalizedDescription.split('\n');

    // Parse each line and split into segments with formatting
    const parseLineSegments = (line: string): Array<{ text: string; bold: boolean; color: string }> => {
      const segments: Array<{ text: string; bold: boolean; color: string }> = [];
      let currentIndex = 0;

      // Match [text] patterns
      const regex = /\[(.*?)\]/g;
      let match;

      while ((match = regex.exec(line)) !== null) {
        // Add text before the match
        if (match.index > currentIndex) {
          const beforeText = line.substring(currentIndex, match.index);
          if (beforeText.trim()) {
            segments.push({ text: beforeText, bold: false, color: defaultColor });
          }
        }

        // Add the matched text (bold, colored)
        segments.push({ text: match[1], bold: true, color: '#8D3F0B' });
        currentIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (currentIndex < line.length) {
        const remainingText = line.substring(currentIndex);
        if (remainingText.trim()) {
          segments.push({ text: remainingText, bold: false, color: defaultColor });
        }
      }

      // If no matches, render entire line as normal
      if (segments.length === 0 && line.trim()) {
        segments.push({ text: line, bold: false, color: defaultColor });
      }

      return segments;
    };

    // First pass: calculate line widths and layout words (centered like Cocos Creator)
    const actualLineHeight = lineHeight !== undefined ? lineHeight : fontSize;

    interface WordInfo {
      text: string;
      width: number;
      color: string;
    }

    interface LineInfo {
      words: WordInfo[];
      width: number;
    }

    const lines: LineInfo[] = [];

    // Process each raw line (preserving newlines)
    for (const rawLine of rawLines) {
      const segments = parseLineSegments(rawLine);
      
      // Skip empty lines
      if (segments.length === 0) {
        continue;
      }

      let currentLine: WordInfo[] = [];
      let currentLineWidth = 0;

      for (const segment of segments) {
        const font = this.boldFont!; // Use bold font for description
        const words = segment.text.split(/\s+/).filter(w => w.length > 0);
        const spaceWidth = font.getAdvanceWidth(' ', fontSize);

        for (const word of words) {
          const wordWidth = font.getAdvanceWidth(word, fontSize);
          const totalWidth = currentLineWidth + (currentLine.length > 0 ? spaceWidth : 0) + wordWidth;

          // Check if word fits on current line
          if (totalWidth > maxWidth && currentLine.length > 0) {
            // Finish current line and start new one
            lines.push({ words: [...currentLine], width: currentLineWidth });
            currentLine = [];
            currentLineWidth = 0;
          }

          currentLine.push({ text: word, width: wordWidth, color: segment.color });
          currentLineWidth += (currentLine.length > 1 ? spaceWidth : 0) + wordWidth;
        }
      }

      // Add the line (or start of next line if it wrapped)
      if (currentLine.length > 0) {
        lines.push({ words: currentLine, width: currentLineWidth });
      }
    }

    // Calculate vertical center offset for description text (opentype.js uses baseline)
    const verticalOffset = this.getVerticalCenterOffset(this.boldFont!, fontSize);

    // Calculate starting Y position: center the block of lines vertically
    // If we have N lines, the center should be at y, so:
    // - First line should be at: y - (N-1) * lineHeight / 2
    // - Then we move down (add lineHeight) for each subsequent line
    const totalHeight = (lines.length - 1) * actualLineHeight;
    const startY = y - totalHeight / 2 + verticalOffset;

    // Second pass: render lines from top to bottom (Cocos Creator behavior)
    const paths: string[] = [];
    let currentY = startY;

    for (const line of lines) {
      // Center the line horizontally
      const lineStartX = x - line.width / 2;
      let currentX = lineStartX;

      for (let i = 0; i < line.words.length; i++) {
        const wordInfo = line.words[i];
        const font = this.boldFont!;
        const spaceWidth = font.getAdvanceWidth(' ', fontSize);

        // Add space before word (except first word)
        if (i > 0) {
          currentX += spaceWidth;
        }

        // Render word
        const path = font.getPath(wordInfo.text, currentX, currentY, fontSize);
        const pathData = path.toPathData(2);
        paths.push(`<path d="${pathData}" fill="${wordInfo.color}"/>`);

        currentX += wordInfo.width;
      }

      currentY += actualLineHeight; // Move down for next line (SVG Y increases downward)
    }

    return paths.join('\n');
  }

  /**
   * Measure text width
   */
  measureText(text: string, fontSize: number, bold: boolean = false): number {
    const font = bold ? this.boldFont : this.regularFont;
    if (!font) {
      return 0;
    }
    return font.getAdvanceWidth(text, fontSize);
  }
}
