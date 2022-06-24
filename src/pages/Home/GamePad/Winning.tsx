import React from "react";
import Confetti from "react-confetti";
import { CONGRAT } from "../../../constants/enum";
import { useSudokuGame } from "../GameProvider";

const Winning = () => {
  const { solved } = useSudokuGame();

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
        </>
      )}
    </div>
  );
};

export default Winning;
