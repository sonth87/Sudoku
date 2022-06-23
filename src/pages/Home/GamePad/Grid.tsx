import React from "react";
import Tile from "./Tile";

const Grid = () => {
  return (
    <div className="grid grid-cols-3 gap-[1px] bg-gray-300 rounded-sm shadow p-[1px]">
      {Array(9)
        .fill(0)
        .map((item, key) => (
          <Tile key={key} defaultValue={item} />
        ))}
    </div>
  );
};

export default Grid;
