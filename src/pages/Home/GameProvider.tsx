import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { DifficultType, GAME_STATUS } from "../../constants/enum";
import { GridType } from "../../types/sudoku";
import {
  converCellBlockToGrid,
  generateNewGame,
  get3x3Block,
  initGrid,
  solveGame,
  validateGame,
} from "../../utils/sudokuGameUtils";

type CellInfoType = {
  row: number;
  col: number;
  value: number;
};

type ContextType = {
  newGame: GridType;
  userSelected: GridType;
  solved: boolean;
  onCellChange: (info: CellInfoType) => void;
  difficultLevel: DifficultType;
  setDifficultLevel: Dispatch<SetStateAction<DifficultType>>;
};

const GameContext = createContext<ContextType>({
  newGame: [],
  userSelected: [],
  solved: false,
  onCellChange: () => {},
  difficultLevel: DifficultType.NORMAL,
  setDifficultLevel: () => {},
});

type Props = React.PropsWithChildren;

const GameProvider: FC<Props> = ({ children }) => {
  const [newGame, setNewGame] = useState<GridType>([]);
  const [userSelected, setUserSelected] = useState<GridType>([]);
  const [solvedGame, setSolvedGame] = useState<GridType>([]);
  const [solved, setSolved] = useState(false);
  const [difficultLevel, setDifficultLevel] = useState(DifficultType.NORMAL);

  useEffect(() => {
    const grid = initGrid(); // generate some unique number first
    // const possibleNumber = getPossibleNumberByCell(grid);
    setUserSelected([]);

    const solveGrid = [...grid];
    solveGame(solveGrid);
    const game = generateNewGame(solveGrid, difficultLevel);
    const grid3x3 = get3x3Block(game);

    setSolvedGame(solveGrid);
    setNewGame(grid3x3);
    setUserSelected(game);
  }, [difficultLevel]);

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
        newGame,
        userSelected,
        solved,
        onCellChange,
        difficultLevel,
        setDifficultLevel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useSudokuGame = () => useContext(GameContext);
export { useSudokuGame, GameProvider as SudokuGameProvider };
