import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { GAME_STATUS } from "../../constants/enum";
import { GridType } from "../../types/sudoku";
import {
  converCellBlockToGrid,
  generateNewGame,
  get3x3Block,
  solveGame,
  validateGame,
} from "../../utils/sudokuGameUtils";

type CellInfoType = {
  row: number;
  col: number;
  value: number;
};

type ContextType = {
  grid: GridType;
  newGame: GridType;
  userSelected: GridType;
  solved: boolean;
  onCellChange: (info: CellInfoType) => void;
};

const GameContext = createContext<ContextType>({
  grid: [],
  newGame: [],
  userSelected: [],
  solved: false,
  onCellChange: () => {},
});

type Props = React.PropsWithChildren<{ grid: GridType }>;

const GameProvider: FC<Props> = ({ grid, children }) => {
  const [newGame, setNewGame] = useState<GridType>([]);
  const [userSelected, setUserSelected] = useState<GridType>([]);
  const [solvedGame, setSolvedGame] = useState<GridType>([]);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    // const possibleNumber = getPossibleNumberByCell(grid);
    const solveGrid = [...grid];
    solveGame(solveGrid);
    const game = generateNewGame(solveGrid);
    const grid3x3 = get3x3Block(game);

    setSolvedGame(solveGrid);
    setNewGame(grid3x3);
    setUserSelected(game);
  }, [grid]);

  const onCellChange = ({ row, col, value }: CellInfoType) => {
    const selectedObj = [...userSelected];

    const { convertedRow, convertedCol } = converCellBlockToGrid(row, col);

    if (selectedObj?.[convertedRow]?.[convertedCol] >= 0) {
      selectedObj[row][col] = value;
      setUserSelected(selectedObj);

      const check = selectedObj.find((row) => row.find((cell) => !cell));

      if (!check) {
        const status = validateGame(selectedObj);
        if (status === GAME_STATUS.SOLVED) {
          setSolved(true);
        }
      }
    }
  };

  return (
    <GameContext.Provider
      value={{
        grid,
        newGame,
        userSelected,
        solved,
        onCellChange,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useSudokuGame = () => useContext(GameContext);
export { useSudokuGame, GameProvider as SudokuGameProvider };
