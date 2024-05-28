import React, { useState, useEffect } from "react";
import axios from "axios";

function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/category");
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
      const response = await axios.post("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/category", {
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
    <div className="h-full w-auto bg-logo2 m-5">
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="flex flex-row flex-wrap">
          {categoryList.map((category) => (
            <p className="bg-logo1 m-1 p-1 rounded-full border-2 border-orange-200" key={category._id}>{category.category_name}</p>
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
