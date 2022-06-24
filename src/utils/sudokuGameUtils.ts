import { CELL_HIDDEN, GAME_STATUS } from "../constants/enum";
import { GridType, NumInPos } from "../types/sudoku";

export const getRandomNumber = () => {
  return Math.floor(Math.random() * 9);
};

/**
 *
 * @returns zero[]
 */
export const createZeroList = (): number[] => {
  return Array(9).fill(0);
};

/**
 * create 9x9 grid
  0  0  0 | 0  0  0 | 0  0  0
  0  1  0 | 0  0  0 | 0  0  0
  0__0__2_|_0__0__0_|_0__0__0
  0  0  0 | 3  0  0 | 0  0  0
  0  0  0 | 0  4  0 | 0  0  0
  0__0__0_|_0__0__5_|_0__0__0
  0  0  0 | 0  0  0 | 6  0  0
  0  0  0 | 0  0  0 | 0  7  0
  0  0  0 | 0  0  0 | 0  0  8
 * @returns number[][] 9x9 grid
 */
export const createDefaultGrid = (): GridType => {
  return Array(9)
    .fill(null)
    .map(() => createZeroList());
};

export const initGrid = () => {
  let numInPosition: Array<NumInPos> = [];

  for (var i = 1; i <= 9; i++) {
    const randomNumForRow = getRandomNumber();
    const randomNumForCol = getRandomNumber();
    let numberExist = false;

    numInPosition.every((num) => {
      if (num.row === randomNumForRow && num.col === randomNumForCol) {
        numberExist = true;
        i--; // goback to retry
        return false;
      }
      return true;
    });

    if (!numberExist)
      numInPosition.push({
        num: i,
        row: randomNumForRow,
        col: randomNumForCol,
      });
  }

  const defaultGrid = createDefaultGrid();

  // fill number to grid
  numInPosition.forEach((uniqNum) => {
    defaultGrid[uniqNum.row][uniqNum.col] = uniqNum.num;
  });

  return defaultGrid;
};

/**
 * get List of possible number in each cell
 * @param grid :number[][] ;
 * @returns number[][]
 */
export const getPossibleNumberByCell = (grid: GridType) => {
  let possibleNumbers: GridType = [];

  const miniGrids = get3x3Block(grid);

  createZeroList().forEach((_, rowIndex) => {
    createZeroList().forEach((_, colIndex) => {
      if (!possibleNumbers[rowIndex * 9 + colIndex])
        possibleNumbers[rowIndex * 9 + colIndex] = [];

      // if this cell added by unique number before
      if (grid[rowIndex][colIndex] !== 0)
        possibleNumbers[rowIndex * 9 + colIndex].push(grid[rowIndex][colIndex]);
      // add this value to possible list directly
      else {
        createZeroList().forEach((_, num) => {
          const thisNum = num + 1;
          const findByRowAndCol = grid.find(
            (row, index) =>
              (rowIndex === index && row.includes(thisNum)) ||
              row[colIndex] === thisNum
          );
          const findInBlock =
            miniGrids[
              Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3)
            ].includes(thisNum);

          // not match in row
          if (!findByRowAndCol && !findInBlock) {
            possibleNumbers[rowIndex * 9 + colIndex].push(thisNum);
          }
        });
      }
    });
  });

  return possibleNumbers;
};

/**
 *
 * @param grid :number[][] 9x9;
 * @returns number[][] 3x3;
 */
export const get3x3Block = (grid: GridType) => {
  let blocks: GridType = [];

  grid.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      const idx = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
      if (!blocks[idx]) blocks[idx] = [];
      blocks[idx].push(grid[rowIndex][colIndex]);
    });
  });

  return blocks;
};

/**
 *
 * @param grid :number[][] 9x9;
 * @returns number[][] 9x9;
 */
export const getGridByColumns = (grid: GridType) => {
  let newColGrid: GridType = [];

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!newColGrid?.[rowIndex]) newColGrid[rowIndex] = [];

      newColGrid?.[rowIndex].push(grid[colIndex][rowIndex]);
    });
  });

  return newColGrid;
};

export const validate = (
  grid: GridType,
  row: number,
  col: number,
  currentNum: number
) => {
  for (let i = 0; i < 9; i++) {
    const m = Math.floor(row / 3) * 3 + Math.floor(i / 3);
    const n = Math.floor(col / 3) * 3 + (i % 3);

    if (
      grid[row][i] === currentNum ||
      grid[i][col] === currentNum ||
      grid[m][n] === currentNum
    ) {
      return false;
    }
  }
  return true;
};

export const solveGame = (grid: GridType) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          if (validate(grid, i, j, k)) {
            grid[i][j] = k;
            if (solveGame(grid)) {
              return true;
            } else {
              grid[i][j] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const validateCell = (
  grid: GridType,
  cols: GridType,
  blocks: GridType,
  row: number,
  col: number
) => {
  // cell empty
  if (grid[row][col] === 0) return GAME_STATUS.NULL;

  // number in row duplicated
  if (grid[row].filter((value) => value === grid[row][col]).length > 1)
    return GAME_STATUS.DUPLICATE;

  // number in col duplicated
  if (cols[row].filter((value) => value === grid[row][col]).length > 1) {
    return GAME_STATUS.DUPLICATE;
  }

  // number in block duplicated
  if (blocks[row].filter((value) => value === grid[row][col]).length > 1)
    return GAME_STATUS.DUPLICATE;

  return "";
};

export const validateGame = (grid: GridType, row?: number, col?: number) => {
  const blocks = get3x3Block(grid);
  const cols = getGridByColumns(grid);

  if (typeof row === "number" && typeof col === "number") {
    const status = validateCell(grid, cols, blocks, row, col);
    if (status !== "") return status;
  } else {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const status = validateCell(grid, cols, blocks, i, j);
        if (status !== "") return status;
      }
    }
  }

  return GAME_STATUS.SOLVED;
};

/**
 *
 * @param grid :number[][] ;
 * @returns grid with hidden cell
 */
export const generateNewGame = (grid: GridType) => {
  const newGrid = [...grid];
  for (let i = 0; i < CELL_HIDDEN; ) {
    let rowIndex = Math.floor(Math.random() * 9);
    let colIndex = Math.floor(Math.random() * 9);
    if (newGrid[rowIndex][colIndex] !== 0) {
      newGrid[rowIndex][colIndex] = 0;
      i++;
    }
  }

  return newGrid;
};

/**
 * convert row of 3x3 block to grid 9x9
 * @param row
 * @param col
 * @returns new row index
 */
export const convertRowBlockToGrid = (row: number, col: number) => {
  return Math.floor(row / 3) * 3 + Math.floor(col / 3);
};

/**
 * convert col of 3x3 block to grid 9x9
 * @param row
 * @param col
 * @returns new col index
 */
export const convertColBlockToGrid = (row: number, col: number) => {
  return (row - Math.floor(row / 3) * 3) * 3 + (col - Math.floor(col / 3) * 3);
};

export const converCellBlockToGrid = (row: number, col: number) => {
  const convertedRow = convertRowBlockToGrid(row, col);
  const convertedCol = convertColBlockToGrid(row, col);

  return { convertedRow, convertedCol };
};
