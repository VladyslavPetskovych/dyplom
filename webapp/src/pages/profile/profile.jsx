// Profile.js
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import userpic from "../../assets/default/defUser.jpg";
import EditModal from "./editModal";

function Profile() {
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatId = useSelector((state) => state.user.chatId);
  console.log(typeof chatId)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/${chatId}`);
      setUserData(response.data.user);
    };
    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen bg-neutral-200 text-black p-5 flex justify-center ">
      <div className="flex flex-col items-center">
        <img className="h-32 w-32 rounded-full" src={userpic} alt="" />
        <div className="flex flex-row">
          <p className="px-1 bg-neutral-300">Псевдо </p>
          <p>{userData.name}</p>
          <p>{chatId}</p>
        </div>
        <button className="bg-amber-100" onClick={handleEditClick}>
          Редагувати
        </button>
        {isModalOpen && (
          // Pass isOpen prop with isModalOpen value to EditModal
          <EditModal onClose={handleCloseModal} isOpen={isModalOpen}  userData={userData} />
        )}
      </div>
    </div>
  );
}

export default Profile;
