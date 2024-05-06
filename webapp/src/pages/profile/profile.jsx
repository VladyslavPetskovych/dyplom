import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import EditModal from "./editModal";
import defaultUserImage from "../../assets/default/defUser.jpg";

function Profile() {
  const [userData, setUserData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState(defaultUserImage);
  const chatId = useSelector((state) => state.user.chatId);

  useEffect(() => {
    fetchData();
  }, [chatId]);

  const fetchData = async () => {
    if (chatId) {
      try {
        const response = await axios.get(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/getUser/${chatId}`);
        setUserData(response.data.user);
        updateUserImage(response.data.user.img);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const updateUserImage = (filenameOrUrl) => {
    console.log("Received for update:", filenameOrUrl); // See what is received exactly
    const filename = filenameOrUrl.split('/').pop();
    const newImageUrl = `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/usersPics/${filename}?${new Date().getTime()}`;
    console.log("New image URL:", newImageUrl); // Check the constructed URL
    setUserProfilePic(newImageUrl);
};


  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchData(); // This will re-fetch user data, including the latest image filename
};


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
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            userData={userData}
            setUserData={setUserData}
            onUpdateImage={updateUserImage}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
