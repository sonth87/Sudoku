import React from "react";
import {
  generateNewGame,
  getPossibleNumberByCell,
  initGrid,
  solveGame,
} from "../../../utils/sudokuGameUtils";
import Grid from "./Grid";

const GamePad = () => {
  const grid = initGrid(); // generate some unique number first

  // const possibleNumber = getPossibleNumberByCell(grid);

  const solveGrid = [...grid];
  solveGame(solveGrid);

  const newGame = generateNewGame(solveGrid);

  return (
    <div className="grid grid-cols-3 gap-1 bg-white rounded shadow-lg p-3">
      {newGame.map((row, key) => (
        <Grid key={key} grid={newGame} row={row} rowIndex={key} />
      ))}
    </div>
  );
};

export default GamePad;
