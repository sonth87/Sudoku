import React from "react";
import GamePad from "./GamePad";
import GameHeader from "./Header";

const HomePage = () => {
  return (
    <div>
      <div className="p-2">
        <GameHeader start />
      </div>

      <div className="p-2">
        <GamePad />
      </div>
    </div>
  );
};

export default HomePage;
