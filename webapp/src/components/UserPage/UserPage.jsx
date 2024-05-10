import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import defaultUserImage from "../../assets/default/defUser.jpg";

function UserPage() {
  const { userId } = useParams();
  const recieverId = userId;
  const [userInfo, setUserInfo] = useState({
    user: null,
    loading: true,
    error: "",
  });

  useEffect(() => {
    if (!userId) {
      setUserInfo({
        ...userInfo,
        loading: false,
        error: "User ID not initialized.",
      });
      return;
    }

    axios
      .get(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/getUser/${userId}`
      )
      .then((response) => {
        setUserInfo({ ...userInfo, user: response.data.user, loading: false });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setUserInfo({
          ...userInfo,
          loading: false,
          error: "Failed to fetch user details",
        });
      });
  }, [userId]);

  const { user, loading, error } = userInfo;

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!user) return <div className="text-center">No user data available.</div>;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <img
          className="w-36 h-36 rounded-full object-cover mb-4"
          src={
            user.img
              ? `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/usersPics/${user.img}`
              : defaultUserImage
          }
          alt={user.name || "Anonymous"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultUserImage;
          }}
        />

        <p className="text-gray-700 mb-5">
          {user.posts && user.posts.length > 0 ? user.posts[0].text : ""}
        </p>
        <p className="text-gray-600 my-5">More details here...</p>
        
        <Link
          to={`/chat/${recieverId}`}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Надіслати повідомлення
        </Link>
      </div>
    </div>
  );
}

export default UserPage;
