import classNames from "classnames";
import React, { FC } from "react";
import { Difficult, DifficultType } from "../../constants/enum";
import { useSudokuGame } from "./GameProvider";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  position?: "top" | "bottom";
};

const SelectDifficultLevel: FC<Props> = ({
  isOpen = false,
  onClose,
  position = "bottom",
}) => {
  const { difficultLevel, setDifficultLevel } = useSudokuGame();

  return (
    <div>
      {isOpen && (
        <div
          className={classNames(
            "absolute z-[2] bg-white py-2 rounded space-y-0.5 mt-1",
            position === "top" ? "bottom-0" : ""
          )}
        >
          {Object.keys(Difficult).map((d) => (
            <div
              key={d}
              className={classNames(
                "hover:bg-blue-100 duration-300 px-4 py-1",
                d === difficultLevel
                  ? "bg-blue-100 cursor-default"
                  : "cursor-pointer"
              )}
              onClick={() => {
                setDifficultLevel(d as DifficultType);
                onClose?.();
              }}
            >
              {Difficult[d]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDifficultLevel;
