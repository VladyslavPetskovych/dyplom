import React, { useState } from "react";
import SliderCategories from "./sliderCategories";
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div className="w-screen h-10 px-8 " onClick={toggleDropdown}>
        <p className="w-36 bg-black h-9">⚪ Категорії ⇩</p>
        
      </div>
      {isOpen && (
        <div className=" top-full left-0 w-screen bg-black shadow-md ">
          <div className="w-screen h-[160px] px-8 ">
            <SliderCategories />
          </div>

        
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
