import React, { useState } from "react";
import { initGrid } from "../../utils/sudokuGameUtils";
import GamePad from "./GamePad";
import Winning from "./GamePad/Winning";
import { SudokuGameProvider } from "./GameProvider";
import GameHeader from "./Header";

const HomePage = () => {
  return (
    <div>
      <SudokuGameProvider>
        <div className="p-2">
          <GameHeader />
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
