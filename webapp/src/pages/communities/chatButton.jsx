import React, { useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { getUserData } from '../../components/fetchUser'; // Ensure the path is correct
import { Link } from "react-router-dom";

function ChatButton({ chat, currentUserId }) {
  const [otherUser, setOtherUser] = useState(null); // To store other user's data

  useEffect(() => {
    // Determine the other participant's ID
    const otherUserId = chat.participants.find(id => id !== currentUserId);

    // Fetch the other user's data if ID found
    if (otherUserId) {
      getUserData(otherUserId)
        .then(userData => {
          if (userData) {
            setOtherUser(userData); // Store user data in state
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setOtherUser(null); // Reset on error
        });
    }
  }, [chat, currentUserId]); // Depend on chat and currentUserId to re-run the effect

  if (!otherUser) {
    return <p>Loading...</p>; // Show loading or nothing while data is fetching
  }

  return (
    <div className="flex flex-row justify-center items-center m-2">
      <FiMessageCircle className="text-white mr-2" size={24} />
      <Link 
        to={`/chat/${otherUser.user.chatId}`} // Use otherUser.id that was fetched
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Chat with {otherUser.user.name} {/* Display the name instead of ID */}
      </Link>
    </div>
  );
}

export default ChatButton;
