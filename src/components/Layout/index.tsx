import classNames from "classnames";
import React, { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { PAGE_TITLE, PATH, PATHNAME } from "../../constants/path";

type Props = {
  children: React.ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  return (
    <div className="bg-cyan-900 h-screen flex justify-center items-center">
      <div className="absolute top-0 right-0">
        <div
          onClick={handleToggleMenu}
          className={classNames(
            "py-5 px-7 cursor-pointer font-semibold duration-300 hover:text-gray-300",
            showMenu ? "text-gray-300" : ""
          )}
        >
          Menu
        </div>
        {showMenu && (
          <div className="absolute right-0">
            {Object.keys(PATHNAME).map((item, key) => (
              <Link key={key} to={PATH[item]}>
                <div
                  className="px-6 py-2 text-right cursor-pointer duration-300 hover:text-gray-300"
                  onClick={handleToggleMenu}
                >
                  {PAGE_TITLE[item]}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default BaseLayout;
