import classNames from "classnames";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { GAME_STATUS } from "../../../constants/enum";
import {
  converCellBtwBlockAndGrid,
  validateGame,
} from "../../../utils/sudokuGameUtils";
import { useSudokuGame } from "../GameProvider";
import SelectNumber from "./SelectNumber";

type Props = {
  defaultValue?: number;
  clickable?: boolean;
  rowIndex: number;
  colIndex: number;
};

const Tile: FC<Props> = ({
  defaultValue,
  clickable = false,
  rowIndex,
  colIndex,
}) => {
  const { userSelected, onCellChange } = useSudokuGame();
  const [showSelection, setShowSelection] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const ref = useRef<any>(null);

  const { convertedRow, convertedCol } = useMemo(
    () => converCellBtwBlockAndGrid(rowIndex, colIndex),
    [rowIndex, colIndex]
  );
  const numberInCell = userSelected?.[convertedRow]?.[convertedCol] || 0;

  const handleOpenSelectNumber = useCallback(() => {
    setShowSelection(true);
  }, []);

  const handleCloseSelectNumber = useCallback(() => {
    setShowSelection(false);
  }, []);

  const handleSelectNumber = (selectedNumber: number) => {
    onCellChange({
      row: convertedRow,
      col: convertedCol,
      value: selectedNumber,
    });
    setIsDuplicate(false);

    if (userSelected && selectedNumber > 0) {
      const status = validateGame({
        grid: userSelected,
        row: convertedRow,
        col: convertedCol,
      });

      if (status === GAME_STATUS.DUPLICATE) setIsDuplicate(true);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className={classNames(
          "w-10 max-w-full pt-[100%] bg-white flex justify-center items-center hover:bg-orange-50 duration-300 relative",
          clickable ? "cursor-pointer" : "",
          defaultValue ? "bg-gray-100 text-gray-400" : "",
          showSelection ? "bg-orange-50" : "",
          isDuplicate ? "cell-error" : ""
        )}
        onClick={clickable ? handleOpenSelectNumber : undefined}
      >
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
          {numberInCell ? numberInCell : defaultValue !== 0 ? defaultValue : ""}
        </div>
      </div>

      {showSelection && (
        <SelectNumber
          hideNumber={defaultValue}
          onClose={handleCloseSelectNumber}
          onSelect={handleSelectNumber}
          cellRef={ref}
        />
      )}
    </div>
  );
};

export default Tile;
