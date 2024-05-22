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
        const response = await axios.get("https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchUserInterests = async () => {
      try {
        const response = await axios.get(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/category/${chatId}/interests`);
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
      setSelectedInterests(selectedInterests.filter((item) => item !== category));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, category]);
    }
  };

  const saveInterests = async () => {
    try {
      await axios.post(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/category/${chatId}/interests`, {
        interests: selectedInterests,
      });
      closeModal();
    } catch (error) {
      console.error("Error saving interests: ", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-2 m-2 bg-slate-800 h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Ваші зацікавлення:</h2>
        <ul className="flex flex-row flex-wrap ml-6 mt-2">
          {selectedInterests.map((interest, index) => (
            <li className="p-1 m-1" key={index}>
              {interest}
            </li>
          ))}
          <li>
            <button
              onClick={openModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              обрати
            </button>
          </li>
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedInterests.includes(category.category_name)
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => handleSelectInterest(category.category_name)}
            >
              {category.category_name}
            </div>
          ))}
        </div>
        <button
          onClick={saveInterests}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Save Interests
        </button>
      </Modal>
    </div>
  );
}

export default Interests;
