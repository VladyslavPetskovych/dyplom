import React, { useState } from "react";
import SliderCategories from "./sliderCategories";
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div className="w-screen h-10 px-8 bg-black" onClick={toggleDropdown}>
        <p className="">⚪ Категорії ⇩</p>
        
      </div>
      {isOpen && (
        <div className=" top-full left-0 w-screen bg-white shadow-md">
          <div className="w-screen h-[160px] px-8 bg-black">
            <SliderCategories />
          </div>

        
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
