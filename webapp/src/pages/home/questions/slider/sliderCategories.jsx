// src/components/SliderCategories.js

import React from "react";
import News from "./News";

const SliderCategories = ({ onCategoryClick }) => {
  return (
    <div className="sliderCat">
     
      <News onCategoryClick={onCategoryClick} />
    </div>
  );
};

export default SliderCategories;
