import classNames from "classnames";
import React, { useState } from "react";
import { Difficult } from "../../constants/enum";
import { getTimeFromNumber } from "../../utils/datetime";
import { useSudokuGame } from "./GameProvider";
import SelectDifficultLevel from "./SelectDifficultLevel";

const GameHeader = () => {
  const { difficultLevel, timer } = useSudokuGame();
  const [showDD, setShowDD] = useState(false);

  return (
    <div>
      <div className="h-20 flex justify-center">
        <div className="text-2xl text-red-200 italic after:text-blue-200 text-center relative before:content-['SUDOKU'] before:text-4xl before:overflow-hidden before:absolute after:bg-cyan-900 after:content-['SUDOKU'] after:text-4xl after:h-5 after:overflow-hidden after:absolute after:left-1/2 before:-translate-x-1/2 after:-translate-x-1/2 after:pr-2"></div>
      </div>

      <div className="flex items-center justify-between mt-4 relative">
        <div>
          <div
            onClick={() => setShowDD(!showDD)}
            className={classNames(
              "py-1 px-4 text-sm cursor-pointer text-white hover:text-blue-600 hover:bg-white duration-300 rounded",
              showDD ? "bg-white text-blue-600" : ""
            )}
          >
            {Difficult[difficultLevel]}
          </div>

          <SelectDifficultLevel
            isOpen={showDD}
            onClose={() => setShowDD(false)}
          />
        </div>
        <div className="text-gray-400 text-xs">
          Time : {getTimeFromNumber(timer) || "00:00:00"}
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
