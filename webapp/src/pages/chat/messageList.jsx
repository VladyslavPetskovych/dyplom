import React from "react";
import ShowUser from "./showUser";
import { format } from "date-fns";

function MessageList({ messages, senderId, receiverId }) {
  return (
    <div className="flex flex-col-reverse flex-grow overflow-auto">
      {messages
        .slice()
        .reverse()
        .map((msg, index) => (
          <div
            key={index}
            className="border bg-slate-700 p-1 m-1 flex justify-between"
          >
            <div className="flex flex-row items-center">
              <strong className="mr-2">
                {msg.senderId === senderId ? (
                  <ShowUser chatId={senderId} />
                ) : (
                  <ShowUser chatId={receiverId} />
                )}
              </strong>
              <span className="break-all">{msg.message}</span>
            </div>

            <div className="text-xs text-gray-500">
              {format(new Date(msg.timestamp), "p")}
            </div>
          </div>
        ))}
    </div>
  );
}

export default MessageList;
