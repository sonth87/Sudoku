import React from "react";
import { useSudokuGame } from "../GameProvider";
import Grid from "./Grid";

const GamePad = () => {
  const { newGame } = useSudokuGame();

  return (
    <div className="grid grid-cols-3 gap-1 bg-white rounded shadow-lg p-3">
      {newGame?.map((row, key) => {
        return <Grid key={key} row={row} rowIndex={key} />;
      })}
    </div>
  );
};

export default GamePad;
