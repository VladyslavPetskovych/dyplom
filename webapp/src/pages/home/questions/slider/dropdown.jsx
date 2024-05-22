// src/components/DropdownMenu.js

import React, { useState } from "react";
import SliderCategories from "./sliderCategories";

const DropdownMenu = ({ onCategoryClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[96vw] p-1">
      <div className="h-12">
        <button
          className="w-150px border p-3 border-logo1  text-white h-9 flex items-center justify-center transition-all duration-300"
          onClick={toggleDropdown}
        >
           Категорії ⇩
        </button>
      </div>
      {isOpen && (
        <div className="w-full m-1   bg-black text-white  transition-all duration-300">
          <div className="h-[120px] pt-2 px-8 m-3">
            <SliderCategories onCategoryClick={onCategoryClick} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
