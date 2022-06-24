import React, { FC, useEffect, useRef, useState } from "react";
import { Numberic } from "../../../constants/enum";

type Props = {
  hideNumber?: number;
  onClose?: () => void;
  onSelect?: (selectedNumber: number) => void;
  cellRef?: React.MutableRefObject<any>;
};

const SELECT_WIDTH = 122;
const SELECT_HEIGHT = 122;
const REMOVE_50WIDTH = 10;

const SelectNumber: FC<Props> = ({
  hideNumber,
  onClose,
  onSelect,
  cellRef,
}) => {
  const ref = useRef<any>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, rLeft: 0 });

  const checkPointPosition = () => {
    if (ref.current) {
      const height = window.innerHeight;
      const width = window.innerWidth;
      const bouding = ref.current?.getBoundingClientRect();
      const cell = cellRef?.current?.getBoundingClientRect();

      const cond = bouding.top + SELECT_HEIGHT > height;

      const top = cond ? -SELECT_HEIGHT : cell.height;
      const left =
        bouding.left + cell.width + SELECT_WIDTH > width
          ? -SELECT_WIDTH
          : cell.width;
      const rLeft =
        cond && bouding.left + SELECT_WIDTH < width
          ? -REMOVE_50WIDTH
          : cell.width - REMOVE_50WIDTH;

      setPosition({ top, left, rLeft });
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose?.();
      }
    }
    checkPointPosition();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectNumber = (num: number) => {
    onSelect?.(num);
    onClose?.();
  };

  const numBlock = (num: number) => (
    <div
      key={num}
      className="w-10 h-10 bg-blue-100 hover:bg-blue-300 duration-300 cursor-pointer flex justify-center items-center rounded-sm"
      onClick={() => handleSelectNumber(num)}
    >
      {num}
    </div>
  );

  return (
    <div ref={ref}>
      <div
        style={{ left: position.rLeft }}
        onClick={() => handleSelectNumber(0)}
        className="w-5 h-5 bg-red-600 text-xs text-white cursor-pointer opacity-50 hover:opacity-100 shadow-lg absolute top-0 -translate-y-1/2 z-[1] rounded-full flex justify-center items-center"
      >
        x
      </div>

      <div
        style={{ ...position }}
        className="absolute z-[1] opacity-1 grid grid-cols-3 min-w-[122px] shadow-lg bg-blue-50 gap-[1px] rounded-lg overflow-hidden"
      >
        {Numberic.map((num) => numBlock(num))}
      </div>
    </div>
  );
};

export default SelectNumber;
