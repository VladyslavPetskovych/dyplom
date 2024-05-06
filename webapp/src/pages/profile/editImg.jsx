import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import { useSelector } from "react-redux";
function EditImg({ onUpdateImage }) {
  const [file, setFile] = useState(null);
  const chatId = useSelector((state) => state.user.chatId);
  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Update the state with the selected file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }
  
    const formData = new FormData();
    formData.append("profilePic", file);
  
    try {
      const response = await axios.put(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/profile/editPhoto/${chatId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        onUpdateImage(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/usersPics/${response.data.user.img}`);
        alert("File uploaded successfully!");
      } else {
        console.error("Failed to upload file: ", response.data);
        alert("Failed to upload file.");
      }
      
      
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          className="border border-gray-300 p-2 mt-2 w-full rounded"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}

export default EditImg;
