import React, { useState } from "react";
import axios from "axios";

function EditModal({ isOpen, onClose, userData, setUserData, onUpdateImage }) {
  const [newName, setNewName] = useState(userData.name);
  const [newAge, setNewAge] = useState(userData.age || "");
  const [newSex, setNewSex] = useState(userData.sex || "");
  const [newCity, setNewCity] = useState(userData.city || "");
  const [file, setFile] = useState(null);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update the state with the selected file
  };

  const saveAllData = async () => {
    console.log(userData.chatId); // Debug chatId
    const chatId = userData.chatId;

    // Update user profile data
    try {
      const profileResponse = await axios.put(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/profile/edit/${chatId}`,
        { name: newName, age: newAge, sex: newSex, city: newCity }
      );
      if (profileResponse.status === 200) {
        setUserData({
          ...userData,
          name: newName,
          age: newAge,
          sex: newSex,
          city: newCity,
        });
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile!");
    }

    // Upload file if available
    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const fileResponse = await axios.put(
          `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/profile/editPhoto/${chatId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (fileResponse.status === 200) {
          onUpdateImage(
            `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/usersPics/${fileResponse.data.user.img}`
          );
          alert("File uploaded successfully!");
        } else {
          console.error("Failed to upload file: ", fileResponse.data);
          alert("Failed to upload file.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file!");
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
      onClick={handleOutsideClick}
    >
      <div className="bg-logo1  bg-opacity-90 p-8 rounded-lg w-[88%] h-[93%]">
        <div className="flex flex-row items-center justify-between text-center">
          <h2 className="text-lg font-semibold">Редагувати профіль</h2>
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Вийти
          </button>
        </div>

        <input
          type="text"
          className="border border-gray-300 p-2 mt-2 w-full rounded"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          className="border border-gray-300 p-2 mt-2 w-full rounded"
          value={newAge}
          placeholder="Вік"
          onChange={(e) => setNewAge(e.target.value)}
        />
        <select
          className="border border-gray-300 p-2 mt-2 w-full rounded"
          value={newSex}
          onChange={(e) => setNewSex(e.target.value)}
        >
          <option value="">Виберіть стать</option>
          <option value="Male">Чоловік</option>
          <option value="Female">Жінка</option>
        </select>
        <input
          type="text"
          className="border border-gray-300 p-2 mt-2 w-full rounded"
          value={newCity}
          placeholder="Місце проживання"
          onChange={(e) => setNewCity(e.target.value)}
        />
        <input
          type="file"
          className="border border-gray-300 p-2 mt-2 w-full rounded"
          onChange={handleFileChange}
        />

        <button
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 m-3 rounded"
          onClick={saveAllData}
        >
          Зберегти
        </button>
      </div>
    </div>
  );
}

export default EditModal;
