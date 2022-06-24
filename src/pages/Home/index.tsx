import React, { useState } from "react";
import { initGrid } from "../../utils/sudokuGameUtils";
import GamePad from "./GamePad";
import Winning from "./GamePad/Winning";
import { SudokuGameProvider } from "./GameProvider";
import GameHeader from "./Header";

const HomePage = () => {
  const grid = initGrid(); // generate some unique number first

  return (
    <div>
      <SudokuGameProvider grid={grid}>
        <div className="p-2">
          <GameHeader start />
        </div>

        <div className="p-2">
          <GamePad />
        </div>

        <Winning />
      </SudokuGameProvider>
    </div>
  );
};

export default HomePage;
