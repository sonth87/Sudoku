import React, { FC } from "react";
import { Grid as GridType } from "../../../types/sudoku";
import Tile from "./Tile";

type Props = {
  grid: GridType;
  row: number[];
  rowIndex: number;
};

const Grid: FC<Props> = ({ row, grid, rowIndex }) => {
  return (
    <div className="grid grid-cols-3 gap-[1px] bg-gray-300 rounded-sm shadow p-[1px]">
      {row.map((item, key) => (
        <Tile
          key={key}
          defaultValue={item}
          clickable={item === 0}
          grid={grid}
          rowIndex={rowIndex}
          colIndex={key}
        />
      ))}
    </div>
  );
};

export default Grid;
