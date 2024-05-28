import React, { useState, useEffect } from "react";
import ListCategory from "./components/listCategory";
import axios from "axios";
import Modal from "./components/homeModal";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(selectedCategoryId.category_id);
    try {
      const response = await axios.post(
        "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/questions",
        {
          questionText: inputValue,
          category_ids: selectedCategoryId.category_id,
        }
      );

      console.log(response.data);
      setSuccessMessage("Запитання додано успішно!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000); // Clear the message after 2 seconds
    } catch (error) {
      console.error("Error:", error);
    }

    setInputValue(""); // Reset the input field
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center mt-10 bg-logo2 p-5 m-5">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div>
          <ListCategory
            categories={categories}
            setCategories={setCategories}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="p-4 m-1">
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
        <div className="flex flex-row">
        <button
            type="button"
            onClick={openModal}
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 flex items-center justify-center"
          >
            Список запитань
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 flex items-center justify-center"
          >
            Додати запитання в БД
          </button>
       
        </div>
        {successMessage && (
          <div className="mt-2 text-logo3">{successMessage}</div>
        )}
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-lg">Список запитань</div>
      </Modal>
    </div>
  );
}

export default Home;
