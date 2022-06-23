import { CELL_HIDDEN } from "../constants/enum";
import { Grid, NumInPos } from "../types/sudoku";

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
 * @returns number[][] 9x9 grid
 */
export const createDefaultGrid = (): Grid => {
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
export const getPossibleNumberByCell = (grid: Grid) => {
  let possibleNumbers: Grid = [];

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
export const get3x3Block = (grid: Grid) => {
  let blocks: Grid = createDefaultGrid();

  grid.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      const idx = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
      blocks[idx].push(grid[rowIndex][colIndex]);
    });
  });

  return blocks;
};

export const validate = (
  grid: Grid,
  row: number,
  col: number,
  currentNum: number,
) => {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
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

export const solveGame = (grid: Grid) => {
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

/**
 *
 * @param grid :number[][] ;
 * @returns grid with hidden cell
 */
export const generateNewGame = (grid: Grid) => {
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
