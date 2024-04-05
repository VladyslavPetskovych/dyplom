import { Link } from "react-router-dom";
import React from "react";

function FooterMenu() {
  return (
    <>
      <div className="relative">
        <nav className="bg-black font-mono text-white h-24 absolute bottom-0 w-full">
          <div className="flex flex-row text-center h-full justify-center items-center">
            <div className="flex-grow w-1/3">
              <Link
                to="/"
                className="block w-full h-full"
                activeClassName="bg-gray-800"
              >
                <button>Відповідай на питання</button>
              </Link>
            </div>
            <div className="flex-grow w-1/3">
              <Link
                to="/communities"
                className="block w-full h-full"
                activeClassName="bg-gray-800"
              >
                <button>Спільноти</button>
              </Link>
            </div>
            <div className="flex-grow w-1/3">
              <Link
                to="/profile"
                className="block w-full h-full"
                activeClassName="bg-gray-800"
              >
                <button>Профіль</button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default FooterMenu;
