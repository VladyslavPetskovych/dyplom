import React, { useState } from "react";
import axios from "axios";
import Category from "./components/category";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState({
    music: false,
    movies: false,
  });

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedCategories = {};

    // Uncheck all categories
    for (const key in categories) {
      if (key === name) {
        updatedCategories[key] = checked;
      } else {
        updatedCategories[key] = false;
      }
    }

    setCategories(updatedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const categoryIDs = Object.keys(categories)
        .map((category, index) => {
          if (categories[category]) {
            return index + 1; // Assuming IDs start from 1
          }
          return null;
        })
        .filter((id) => id !== null);
      console.log(categoryIDs[0]);
      const response = await axios.post("http://localhost:3000/questions", {
        questionText: inputValue,
        category_ids: categoryIDs[0],
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-black h-screen">
      <p className="bg-red-300 h-16 text-3xl w-full">
        Адмін панелька для телеграм боту дипломної роботи
      </p>
      <div>
        <Category />
      </div>
      <div className="flex items-center justify-center mt-10">
        <form
          className="flex flex-col items-center justify-center bg-slate-500"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="text-xl">Категорії</p>
            <label>
              <input
                name="music"
                type="checkbox"
                checked={categories.music}
                onChange={handleCheckboxChange}
              />
              Музика
            </label>
            <label>
              <input
                name="movies"
                type="checkbox"
                checked={categories.movies}
                onChange={handleCheckboxChange}
              />
              Фільми
            </label>
          </div>
          <div className="">
            <label className="m-4 text-2xl">
              Введіть питання, яке потрібно додати в БД
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="................."
              className="rounded-md p-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 flex items-center justify-center mt-10"
            >
              Додати запитання в БД
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
