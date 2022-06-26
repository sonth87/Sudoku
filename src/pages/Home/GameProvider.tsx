import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DifficultType, GAME_STATUS } from "../../constants/enum";
import { GridType } from "../../types/sudoku";
import {
  converCellBtwBlockAndGrid,
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
  solvedGame: GridType;
  solved: boolean;
  onCellChange: (info: CellInfoType) => void;
  difficultLevel: DifficultType;
  setDifficultLevel: Dispatch<SetStateAction<DifficultType>>;
  timer: number;
};

const GameContext = createContext<ContextType>({
  newGame: [],
  userSelected: [],
  solvedGame: [],
  solved: false,
  onCellChange: () => {},
  difficultLevel: DifficultType.NORMAL,
  setDifficultLevel: () => {},
  timer: 0,
});

type Props = React.PropsWithChildren;

const GameProvider: FC<Props> = ({ children }) => {
  const [newGame, setNewGame] = useState<GridType>([]);
  const [userSelected, setUserSelected] = useState<GridType>([]);
  const [solvedGame, setSolvedGame] = useState<GridType>([]);
  const [solved, setSolved] = useState(false);
  const [difficultLevel, setDifficultLevel] = useState(DifficultType.NORMAL);
  const [timer, setTimer] = useState(0);
  const intervalId = useRef<any>(null);

  useEffect(() => {
    if (intervalId) clearInterval(intervalId.current);
    setSolved(false);

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

    let nTimer = 0;
    intervalId.current = setInterval(() => {
      setTimer(nTimer++);
    }, 1000);
  }, [difficultLevel]);

  useEffect(() => {
    if (solved && intervalId) clearInterval(intervalId.current);
  }, [solved]);

  const onCellChange = ({ row, col, value }: CellInfoType) => {
    const selectedObj = [...userSelected];

    const { convertedRow, convertedCol } = converCellBtwBlockAndGrid(row, col);

    if (selectedObj?.[convertedRow]?.[convertedCol] >= 0) {
      selectedObj[row][col] = value;
      setUserSelected(selectedObj);

      const check = selectedObj.find((row) => row.find((cell) => !cell));

      if (!check) {
        const status = validateGame({ grid: selectedObj });
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
        solvedGame,
        solved,
        onCellChange,
        difficultLevel,
        setDifficultLevel,
        timer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const useSudokuGame = () => useContext(GameContext);
export { useSudokuGame, GameProvider as SudokuGameProvider };
