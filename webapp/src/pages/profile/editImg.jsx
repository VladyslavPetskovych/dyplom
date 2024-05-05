import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import EditModal from "./editModal";

function Profile() {
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatId = useSelector((state) => state.user.chatId);

  useEffect(() => {
    const fetchData = async () => {
      if (chatId) {
        const response = await axios.get(
          `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/getUser/${chatId}`
        );
        setUserData(response.data.user);
      }
    };
    fetchData();
  }, [chatId]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Determine the image to display
  const userProfilePic = userData.img ? 
    `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/usersPics/${userData.img}` : 
    require('../../assets/default/defUser.jpg');

  return (
    <div className="h-screen bg-neutral-200 text-black p-5 flex justify-center">
      <div className="flex flex-col items-center">
        <img className="h-32 w-32 rounded-full" src={userProfilePic} alt="User Profile" />
        <div className="flex flex-row">
          <p className="px-1 bg-neutral-300">Псевдо: </p>
          <p>{userData.name}</p>
          <p>{chatId}</p>
        </div>
        <button className="bg-amber-100" onClick={handleEditClick}>
          Редагувати
        </button>
        {isModalOpen && (
          <EditModal
            onClose={handleCloseModal}
            isOpen={isModalOpen}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
