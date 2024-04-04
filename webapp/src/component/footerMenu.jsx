import React from "react";

function footerMenu() {
  return (
    <>
      <div className=" relative">
        <navbar className="bg-black font-mono text-white h-24  absolute bottom-0  w-full">
          <div className="flex flex-row text-center h-full justify-center items-center">
            <div className="flex-grow w-1/3">
              <p>Відповідай на питання</p>
            </div>
            <div className="flex-grow w-1/3">
              <p>Спільноти</p>
            </div>
            <div className="flex-grow w-1/3">
              <p>Профіль</p>
            </div>
          </div>
        </navbar>
      </div>
    </>
  );
}

export default footerMenu;
