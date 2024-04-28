import { Link } from "react-router-dom";
import React from "react";

function FooterMenu() {
  return (
    <div className="fixed bottom-0 w-screen">
      <nav className="bg-black font-mono text-white h-24">
        <div className="flex justify-center items-center h-full">
          <div className="w-1/3">
            <Link to="/" className="block w-full h-full text-center">
              Відповідай на питання
            </Link>
          </div>
          <div className="w-1/3">
            <Link to="/communities" className="block w-full h-full text-center">
              Спільноти
            </Link>
          </div>
          <div className="w-1/3">
            <Link to="/profile" className="block w-full h-full text-center">
              Профіль
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default FooterMenu;
