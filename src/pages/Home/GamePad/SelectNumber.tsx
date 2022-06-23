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
    <div
      className="absolute z-[1] opacity-1 grid grid-cols-3 min-w-[122px] shadow-lg bg-white gap-[1px] rounded overflow-hidden"
      ref={ref}
    >
      {Numberic.map((num) => numBlock(num))}
    </div>
  );
};

export default SelectNumber;
