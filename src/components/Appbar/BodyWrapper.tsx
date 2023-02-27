import React from "react";

interface IBodyWrapper {
  children: any;
}

const BodyWrapper = ({ children }: IBodyWrapper): JSX.Element => {
  return (
    <div className="relative min-h-screen">
      <main className="w-full min-h-screen">{children}</main>
    </div>
  );
};

export default BodyWrapper;
