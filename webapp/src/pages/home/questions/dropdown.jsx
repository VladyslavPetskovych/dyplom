import React, { useState } from "react";
import SliderCategories from "./sliderCategories";
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
<div className=" w-[97vw] p-1">
  <div className="h-12">
    <button
      className="w-150px border border-sky-600 bg-black h-9 transition-all duration-300"
      onClick={toggleDropdown}
    >
      ⚪ Категорії ⇩
    </button>
  </div>
  {isOpen && (
    <div
      className="w-full m-1 border border-sky-600 bg-black shadow-md transition-all duration-300"
      style={{ width: '94vw' }}
    >
      <div className="h-[160px] px-8">
        <SliderCategories />
      </div>
    </div>
  )}
</div>
  );
};

export default DropdownMenu;
