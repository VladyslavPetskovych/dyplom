import React from "react";
import EditImg from "./editImg";
import axios from "axios";
import { useState } from "react";

function EditModal({ isOpen, onClose, userData, setUserData, onUpdateImage }) {
  const [newName, setNewName] = useState(userData.name);

  const handleUpdateUserImage = (newImageUrl) => {
    setUserData({ ...userData, img: newImageUrl });
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const saveData = () => {
    console.log(userData.chatId); //938729564
    setUserData({ ...userData, name: newName });
    console.log(newName); //Bladdfdfddd
    const chatId = userData.chatId;
    axios
      .put(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/profile/edit/${chatId}`,
        { name: newName }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Name updated successfully!");
        } else {
          alert("Failed to update name.");
        }
      })
      .catch((error) => {
        console.error("Error updating name:", error);
        alert("Error updating name!");
      });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-8 rounded-lg w-[88%] h-[93%]">
        <div className="flex flex-row items-center justify-between text-center">
          <h2 className="text-lg font-semibold">Редагувати профіль</h2>
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Вийти
          </button>
        </div>

        <EditImg onUpdateImage={onUpdateImage} />

        <input
          type="text"
          className="border border-gray-300 p-2 mt-2 w-full rounded"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <button
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 m-3 rounded"
          onClick={saveData}
        >
          Зберегти
        </button>
      </div>
    </div>
  );
}

export default EditModal;
