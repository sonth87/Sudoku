import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import { Numberic } from "../../../constants/enum";

type Props = {
  hideNumber?: number;
  onClose?: () => void;
  onSelect?: (selectedNumber: number) => void;
};

const SelectNumber: FC<Props> = ({ hideNumber, onClose, onSelect }) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose?.();
      }
    }

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
        onClick={() => handleSelectNumber(0)}
        className="w-5 h-5 bg-red-600 text-xs text-white cursor-pointer opacity-50 hover:opacity-100 duration-300 shadow-lg absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-[1] rounded-full flex justify-center items-center"
      >
        x
      </div>

      <div className="absolute z-[1] opacity-1 grid grid-cols-3 min-w-[122px] shadow-lg bg-white gap-[1px] rounded overflow-hidden">
        {Numberic.map((num) => numBlock(num))}
      </div>
    </div>
  );
};

export default SelectNumber;
