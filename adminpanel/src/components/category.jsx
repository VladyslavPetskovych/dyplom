import React, { useState, useEffect } from "react";
import axios from "axios";

function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/category");
        setCategoryList(response.data);

        response.data.forEach((category) => {
          console.log(category.category_name);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/category", {
        category_name: categoryName,
      });
      console.log(response.data);
      // Optionally, reset the category name input after successful submission
      setCategoryName("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  return (
    <div className="h-[200px] w-auto bg-slate-400 m-5">
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="flex flex-row">
          {categoryList.map((category) => (
            <p className="bg-green-100 m-1" key={category._id}>{category.category_name}</p>
          ))}
        </div>

        <p className="text-2xl">Додати нову категорію!</p>
        <form
          className="flex flex-col items-center justify-center "
          onSubmit={handleSubmit}
        >
          <div className="">
            <label className="m-4 text-xl">Введіть нову категорію:</label>
            <input
              type="text"
              placeholder=""
              className="rounded-md p-2"
              value={categoryName}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 flex items-center justify-center mt-10"
            >
              Додати категорію
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Category;
