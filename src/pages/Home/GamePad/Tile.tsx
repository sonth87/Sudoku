import classNames from "classnames";
import React, { FC } from "react";

type Props = {
  defaultValue?: number;
  clickable?: boolean;
};

const Tile: FC<Props> = ({ defaultValue, clickable = true }) => {
  return (
    <div
      className={classNames(
        "w-10 h-10 bg-white",
        clickable ? "cursor-pointer" : ""
      )}
    ></div>
  );
};

export default Tile;
