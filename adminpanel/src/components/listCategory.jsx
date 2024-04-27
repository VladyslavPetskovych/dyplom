import React, { useEffect } from "react";
import axios from "axios";

function ListCategory({ categories, setCategories, handleCheckboxChange }) {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/category");
        setCategories(response.data.map(category => ({ ...category, checked: false })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChangeInternal = (clickedCategoryId) => {
    const updatedCategories = categories.map(category =>
      category._id === clickedCategoryId._id
        ? { ...category, checked: true }
        : { ...category, checked: false }
    );
    setCategories(updatedCategories);
    handleCheckboxChange(clickedCategoryId);
  };

  return (
    <div>
      {categories.map((category) => (
        <label key={category._id} className="border-2 p-1 m-1">
          <input
            name={category.category_name}
            type="checkbox"
            checked={category.checked}
            onChange={() => handleCheckboxChangeInternal(category)}
          />
          {category.category_name}
        </label>
      ))}
    </div>
  );
}

export default ListCategory;
