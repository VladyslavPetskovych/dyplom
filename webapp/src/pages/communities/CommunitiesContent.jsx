import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import music from "../../assets/goupchats/1_nChshyHhYer985FIUWu6TA.jpg";
import nltu from "../../assets/goupchats/b27a49cc3697f5d6c06f63de9d556a4598c75db5_1000x282.png";
import film  from "../../assets/goupchats/images.jpg";

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
        className="h-24 bg-red-300 m-1 p-4 rounded-2xl cursor-pointer bg-cover bg-center"
        style={{ backgroundImage: `url(${music})` }}
        onClick={() =>
          joinGroupChat("60f5a3b4c4567890abcd1234", "Чат на тему музики")
        }
      >
        <p className="bg-black text-white w-24 p-1">Чат на тему музики:</p>
      </div>
      <div
        className="h-24 bg-red-300 m-1 p-4 rounded-2xl cursor-pointer bg-cover bg-center"
        style={{ backgroundImage: `url(${film})` }}
        onClick={() =>
          joinGroupChat("60f5a3b4c4567890abcd5678", "Чат на тему фільмів")
        }
      >
        <p className="bg-black text-white w-24 p-1">Чат на тему фільмів:</p>
      </div>
      <div
        className="h-24 bg-red-300 m-1 p-4 rounded-2xl cursor-pointer bg-cover bg-center"
        style={{ backgroundImage: `url(${nltu})` }}
        onClick={() =>
          joinGroupChat("60f5a3b4c4567890abcd5669", "Чат на тему НЛТУ")
        }
      >
        <p className="bg-black text-white w-24 p-1">Чат на тему НЛТУ:</p>
      </div>
    </div>
  );
}

export default CommunitiesContent;
