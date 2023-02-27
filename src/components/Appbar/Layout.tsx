import React from "react";
import BodyWrapper from "./BodyWrapper";
import NavSideBar from "./NavSideBar";

interface ILayout {
    children: any;
  }
  

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <BodyWrapper>
      <div className="flex h-screen bg-gray-200">
        <NavSideBar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="content">
            <section className="sm:flex-row flex flex-col flex-1">
              <div
                className="content-box"
                style={{ flexGrow: 2, flexBasis: "0%" }}
              >
                {children}
              </div>
            </section>
          </main>
        </div>
      </div>
    </BodyWrapper>
  );
};

export default Layout;
