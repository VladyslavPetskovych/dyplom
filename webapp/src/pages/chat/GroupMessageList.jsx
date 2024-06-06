import React from "react";
import FetchUser from "./showUser";
import { format } from "date-fns";

function GroupMessageList({ messages, senderId }) {
  return (
    <div className="flex flex-col-reverse flex-grow overflow-auto">
      {messages
        .slice()
        .reverse()
        .map((msg, index) => (
          <div
            key={msg._id || index} 
            className={`border p-1 m-1 flex flex-col ${
              msg.senderId === senderId ? "bg-logo2" : "bg-logo3"
            }`}
          >
            <div className="flex">
              <FetchUser chatId={msg.senderId} />
              <span className="break-all ml-3 mt-1.5 ">{msg.message}</span>
            </div>
            <div className="text-xs text-black self-end mt-1 drop-shadow-[0_1.1px_1.1px_rgba(255,255,255,1)]">
              {format(new Date(msg.timestamp), "p")}
            </div>
          </div>
        ))}
    </div>
  );
}

export default GroupMessageList;
