import React, { FC, useEffect, useState } from "react";
import { getTimeFromNumber } from "../../utils/datetime";

type Props = {
  start?: boolean;
};

const GameHeader: FC<Props> = ({ start }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (start) {
      let nTimer = 0;
      setInterval(() => {
        setTimer(nTimer++);
      }, 1000);
    }
  }, [start]);

  return (
    <div>
      <h1 className="text-2xl text-center before:content-['SUDOKU'] before:text-4xl before:h-5 before:overflow-hidden">
        Sudoku
      </h1>

      <div className="flex justify-between mt-4">
        <div></div>
        <div className="text-gray-400 text-xs">{getTimeFromNumber(timer)}</div>
      </div>
    </div>
  );
};

export default GameHeader;
