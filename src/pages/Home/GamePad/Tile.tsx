import classNames from "classnames";
import React, { FC, useCallback, useState } from "react";
import SelectNumber from "./SelectNumber";

type Props = {
  defaultValue?: number;
  clickable?: boolean;
};

const Tile: FC<Props> = ({ defaultValue, clickable = true }) => {
  const [showSelection, setShowSelection] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(defaultValue);

  const handleOpenSelectNumber = useCallback(() => {
    setShowSelection(true);
  }, []);

  const handleCloseSelectNumber = useCallback(() => {
    setShowSelection(false);
  }, []);

  const handleSelectNumber = (selectedNumber: number) => {
    setSelectedNumber(selectedNumber);
  };

  return (
    <div className="relative">
      <div
        className={classNames(
          "w-10 h-10 bg-white flex justify-center items-center hover:bg-orange-50 duration-300",
          clickable ? "cursor-pointer" : "",
          defaultValue ? "bg-gray-100 text-gray-400" : "",
          showSelection ? "bg-orange-50" : ""
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
