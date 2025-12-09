// Card data types matching the Engine SDK
export interface CardData {
  name: string;
  cost: number;
  category: number; // CardCategory enum
  description: string;
  target: number; // CardTarget enum
  awake?: {
    value: number;
  };
  golden: boolean;
  exile: boolean;
  tags: number[];
}

export interface CardRenderOptions {
  cardName: string;
  outputPath?: string;
  assetsPath?: string;
}

// Card category to frame color mapping
export const CARD_CATEGORY_FRAMES: Record<number, { frame: string; costFrame: string }> = {
  0: { frame: 'frameRed', costFrame: 'costFrameRed' }, // Strike
  1: { frame: 'frameYellow', costFrame: 'costFrameYellow' }, // Block
  2: { frame: 'frameBlue', costFrame: 'costFrameBlue' }, // Shield
  3: { frame: 'frameGreen', costFrame: 'costFrameGreen' }, // Heal
  4: { frame: 'frameGray', costFrame: 'costFrameGray' }, // Trick
  5: { frame: 'frameGray', costFrame: 'costFrameGray' }, // Trap
  6: { frame: 'framePink', costFrame: 'costFramePink' }, // Sorcery
  7: { frame: 'frameBlack', costFrame: 'costFrameBlack' }, // Equipment
};

// Card category names for icon paths
export const CARD_CATEGORY_NAMES: Record<number, string> = {
  0: 'strike',
  1: 'block',
  2: 'shield',
  3: 'heal',
  4: 'trick',
  5: 'trap',
  6: 'sorcery',
  7: 'equipment',
};
