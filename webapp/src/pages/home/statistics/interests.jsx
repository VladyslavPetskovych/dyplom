// src/components/Interests.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./modal";

function Interests({ chatId }) {
  const [categories, setCategories] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchUserInterests = async () => {
      try {
        const response = await axios.get(
          `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/category/${chatId}/interests`
        );
        setSelectedInterests(response.data.interests);
      } catch (error) {
        console.error("Error fetching user interests: ", error);
      }
    };

    fetchCategories();
    fetchUserInterests();
  }, [chatId]);

  const handleSelectInterest = (category) => {
    if (selectedInterests.includes(category)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== category)
      );
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, category]);
    }
  };

  const saveInterests = async () => {
    try {
      await axios.post(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/category/${chatId}/interests`,
        {
          interests: selectedInterests,
        }
      );
      closeModal();
    } catch (error) {
      console.error("Error saving interests: ", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-2 m-2 bg-black h-full ">
      <div className="mb-4 ">
        <h2 className="text-base font-semibold">Ваші зацікавлення:</h2>
        <ul className="flex flex-row flex-wrap ml-6 mt-2">
          {selectedInterests.map((interest, index) => (
            <li className="p-2 m-1 bg-logo3 bg-opacity-70 text-sm  rounded-full" key={index}>
              {interest}
            </li>
          ))}
          <li>
            <button
              onClick={openModal}
              className="p-2 m-1 bg-logo3 w-12 text-black text-sm rounded-full"
            >
              + 
            </button>
          </li>
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <div
              key={category._id}
              className={`p-4 border shadow-none text-black rounded-lg cursor-pointer transition-colors ${
                selectedInterests.includes(category.category_name)
                  ? "bg-logo3 bg-opacity-90 "
                  : "bg-logo1 "
              }`}
              onClick={() => handleSelectInterest(category.category_name)}
            >
              {category.category_name}
            </div>
          ))}
        </div>
        <button
          onClick={saveInterests}
          className="mt-4 px-4 py-2 w-full bg-green-500 text-white rounded-lg"
        >
          Зберегти
        </button>
      </Modal>
    </div>
  );
}

export default Interests;
