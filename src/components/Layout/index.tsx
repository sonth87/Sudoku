import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-cyan-900 h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default BaseLayout;
