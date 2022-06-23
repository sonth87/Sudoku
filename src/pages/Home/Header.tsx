import React, { FC, useEffect, useState } from "react";
import { getTimeFromNumber } from "../../utils/datetime";

type Props = {
  start?: boolean;
};
let intervalId: NodeJS.Timeout;

const GameHeader: FC<Props> = ({ start }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (start) {
      if (intervalId) clearInterval(intervalId);

      let nTimer = 0;
      intervalId = setInterval(() => {
        setTimer(nTimer++);
      }, 1000);
    }
  }, [start]);

  return (
    <div>
      <div className="h-20 flex justify-center">
        <div className="text-2xl text-red-200 italic after:text-blue-200 text-center relative before:content-['SUDOKU'] before:text-4xl before:overflow-hidden before:absolute after:bg-cyan-900 after:content-['SUDOKU'] after:text-4xl after:h-5 after:overflow-hidden after:absolute after:left-1/2 before:-translate-x-1/2 after:-translate-x-1/2 after:pr-2"></div>
      </div>

      <div className="flex justify-between mt-4">
        <div></div>
        <div className="text-gray-400 text-xs">
          Time : {getTimeFromNumber(timer)}
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
