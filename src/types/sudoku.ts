export type GridType = number[][];

export type NumInPos = { num: number; row: number; col: number };

export type VALIDATE_GAME_TYPE = {
  status?: string;
  block?: {
    blockId: number;
    row: number;
    col: number;
  };
  grid?: {
    row: number;
    col: number;
  };
};
