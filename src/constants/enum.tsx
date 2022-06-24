export const Numberic = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const CELL_HIDDEN = 40;

export enum DifficultType {
  VERY_VERY_VERY_VERY_VERY_EASY = "VERY_VERY_VERY_VERY_VERY_EASY",
  EASY = "EASY",
  NORMAL = "NORMAL",
  HARD = "HARD",
  INSANE = "INSANE",
}

export const Difficult = {
  [`${DifficultType.VERY_VERY_VERY_VERY_VERY_EASY}`]: "🐣", // 2
  [`${DifficultType.EASY}`]: "Easy", // 15
  [`${DifficultType.NORMAL}`]: "Normal", // 25
  [`${DifficultType.HARD}`]: "Hard", // 45
  [`${DifficultType.INSANE}`]: "Insane", // 60
};

export const CellHiddenByDifficult = {
  [`${DifficultType.VERY_VERY_VERY_VERY_VERY_EASY}`]: 2, // 2
  [`${DifficultType.EASY}`]: 15, // 15
  [`${DifficultType.NORMAL}`]: 25, // 25
  [`${DifficultType.HARD}`]: 45, // 45
  [`${DifficultType.INSANE}`]: 60, // 60
};

export const GAME_STATUS = {
  DUPLICATE: "DUPLICATE",
  NULL: "NULL",
  SOLVED: "SOLVED",
};

export const CONGRAT = "Congratulation!!!";
