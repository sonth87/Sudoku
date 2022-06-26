import React, { useState } from "react";
import Confetti from "react-confetti";
import { CONGRAT } from "../../../constants/enum";
import { useSudokuGame } from "../GameProvider";
import SelectDifficultLevel from "../SelectDifficultLevel";

const Winning = () => {
  const { solved } = useSudokuGame();
  const [showDD, setShowDD] = useState(false);

  const handleNewGameBtnClick = React.useCallback(() => {
    setShowDD(!showDD);
  }, [showDD]);

  return (
    <div>
      {solved && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center before:bg-black before:opacity-50 before:absolute before:top-0 before:left-0 before:w-screen before:h-screen">
            <div className="congrat-text flex text-3xl sm:text-5xl duration-300 text-white z-[1] font-bold">
              {CONGRAT.split("").map((char, key) => (
                <div key={key}>{char}</div>
              ))}
            </div>
          </div>

          <div className="relative h-fit">
            <div
              className="absolute z-[2] text-white cursor-pointer"
              onClick={handleNewGameBtnClick}
            >
              Play again
            </div>

            <SelectDifficultLevel isOpen={showDD} position="top" />
          </div>
        </>
      )}
    </div>
  );
};

export default Winning;
