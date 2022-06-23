import classNames from "classnames";
import React, { FC, useCallback, useState } from "react";
import { Grid } from "../../../types/sudoku";
import { validate } from "../../../utils/sudokuGameUtils";
import SelectNumber from "./SelectNumber";

type Props = {
  defaultValue?: number;
  clickable?: boolean;
  grid: Grid;
  rowIndex: number;
  colIndex: number;
};

const Tile: FC<Props> = ({
  defaultValue,
  clickable = false,
  grid,
  rowIndex,
  colIndex,
}) => {
  const [showSelection, setShowSelection] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(defaultValue);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleOpenSelectNumber = useCallback(() => {
    setShowSelection(true);
  }, []);

  const handleCloseSelectNumber = useCallback(() => {
    setShowSelection(false);
  }, []);

  const handleSelectNumber = (selectedNumber: number) => {
    setSelectedNumber(selectedNumber);
    setIsDuplicate(false);

    if (selectedNumber > 0) {
      const valid = validate(grid, rowIndex, colIndex, selectedNumber);
      if (!valid) setIsDuplicate(true);
    }
  };

  return (
    <div className="relative">
      <div
        className={classNames(
          "w-10 h-10 bg-white flex justify-center items-center hover:bg-orange-50 duration-300 relative",
          clickable ? "cursor-pointer" : "",
          defaultValue ? "bg-gray-100 text-gray-400" : "",
          showSelection ? "bg-orange-50" : "",
          isDuplicate
            ? "cell-error before:w-full before:h-full before:absolute before:bg-red-200 before:opacity-50 before:select-none"
            : ""
        )}
        onClick={clickable ? handleOpenSelectNumber : undefined}
      >
        {selectedNumber
          ? selectedNumber
          : defaultValue !== 0
          ? defaultValue
          : ""}
      </div>

      {showSelection && (
        <SelectNumber
          hideNumber={defaultValue}
          onClose={handleCloseSelectNumber}
          onSelect={handleSelectNumber}
        />
      )}
    </div>
  );
};

export default Tile;
