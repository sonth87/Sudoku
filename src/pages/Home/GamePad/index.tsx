import React from "react";
import Grid from "./Grid";

const GamePad = () => {
  return (
    <div className="grid grid-cols-3 gap-1 bg-white rounded shadow-lg p-3">
      {Array(9)
        .fill(null)
        .map((item) => (
          <Grid />
        ))}
    </div>
  );
};

export default GamePad;
