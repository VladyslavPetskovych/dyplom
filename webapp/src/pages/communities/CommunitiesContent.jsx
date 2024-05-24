import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CommunitiesContent() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.chatId);

  const joinGroupChat = async (chatId, chatName) => {
    try {
      console.log(chatId);
      console.log(userId);
      const response = await axios.post(
        "https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/chats/joinGroupChat",
        { chatId: String(chatId), chatName, userId }
      );
      navigate(`/groupChat/${chatId}`);
    } catch (error) {
      console.error("Failed to join group chat:", error);
      alert("Failed to join group chat: " + error.response.data.error);
    }
  };

  return (
    <div className="p-4 h-full min-h-screen bg-red-400">
      <div
        className="h-24 bg-red-300 m-1 p-4 rounded-2xl cursor-pointer"
        onClick={() =>
          joinGroupChat("60f5a3b4c4567890abcd1234", "Чат на тему музики")
        }
      >
        <p>Чат на тему музики:</p>
      </div>
      <div
        className="h-24 bg-red-300 m-1 p-4 rounded-2xl cursor-pointer"
        onClick={() =>
          joinGroupChat("60f5a3b4c4567890abcd5678", "Чат на тему фільмів")
        }
      >
        <p>Чат на тему фільмів:</p>
      </div>
      <div
        className="h-24 bg-red-300 m-1 p-4 rounded-2xl cursor-pointer"
        onClick={() =>
          joinGroupChat("60f5a3b4c4567890abcd5679", "Чат на тему anime")
        }
      >
        <p>Чат на тему anime:</p>
      </div>
    </div>
  );
}

export default CommunitiesContent;
