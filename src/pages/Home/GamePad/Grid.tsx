import React, { FC } from "react";
import Tile from "./Tile";

type Props = {
  row: number[];
  rowIndex: number;
};

const Grid: FC<Props> = ({ row, rowIndex }) => {
  return (
    <div className="grid grid-cols-3 gap-[1px] bg-gray-300 rounded-sm shadow p-[1px]">
      {row?.map((item, key) => (
        <Tile
          key={key}
          defaultValue={item}
          clickable={item === 0}
          rowIndex={rowIndex}
          colIndex={key}
        />
      ))}
    </div>
  );
};

export default Grid;
