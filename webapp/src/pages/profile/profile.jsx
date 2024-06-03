import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import EditModal from "./editModal";
import defaultUserImage from "../../assets/default/defUser.jpg";
import EditProfilePosts from "./posts/addProfilePosts";
import UserPosts from "./posts/profilePosts";

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
        const response = await axios.get(
          `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/getUser/${chatId}`
        );
        setUserData(response.data.user);
        updateUserImage(response.data.user.img);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const updateUserImage = (filenameOrUrl) => {
    console.log("Received for update:", filenameOrUrl);
    const filename = filenameOrUrl.split("/").pop();
    const newImageUrl = `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/usersPics/${filename}?${new Date().getTime()}`;
    console.log("New image URL:", newImageUrl);
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
    <div className="h-full text-black  bg-white flex flex-col justify-center">
      <div className="flex flex-col items-center bg-logo1  p-5">
        <div className="flex flex-row w-full justify-between">
          <p></p>
          <button className="text-xl  rounded-full  p-1" onClick={handleEditClick}>
            ...🖊️
          </button>
        </div>

        <img
          className="h-32 w-32 rounded-full border object-cover  border-black "
          src={userProfilePic}
          alt="User Profile"
        />
        <div className="flex flex-row m-1 mt-4">
          <p className="px-1 bg-neutral-300 mx-2">Псевдо: </p>
          <p>{userData.name}</p>
        </div>

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
      <div className="">
        <EditProfilePosts chatId={chatId} />
      </div>
      <UserPosts userData={userData} />
    </div>
  );
}

export default Profile;
