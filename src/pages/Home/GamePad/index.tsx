import React from "react";
import { getPossibleNumberByCell, initGrid } from "../../../utils/sudokuGameUtils";
import Grid from "./Grid";

const GamePad = () => {
  const grid = initGrid(); // generate some unique number first
// console.log('grid', grid)
  const possibleNumber = getPossibleNumberByCell(grid);
console.log('possibleNumber', possibleNumber)
  return (
    <div className="grid grid-cols-3 gap-1 bg-white rounded shadow-lg p-3">
      {Array(9)
        .fill(null)
        .map((item, key) => (
          <Grid key={key} />
        ))}
    </div>
  );
};

export default GamePad;
