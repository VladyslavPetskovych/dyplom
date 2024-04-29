import React, { useState } from "react";
import SliderCategories from "./sliderCategories";
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full m-2 p-1 ">
      <div className=" h-12 w-full ">
        <button className="w-36 bg-black h-9" onClick={toggleDropdown}>
          ⚪ Категорії ⇩
        </button>
      </div>
      {isOpen && (
        <div className=" top-full left-0 w-[97vw] m-1 bg-black shadow-md ">
          <div className="w-full h-[160px] px-8 ">
            <SliderCategories />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
