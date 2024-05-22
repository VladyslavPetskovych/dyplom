import React, { useState } from "react";

function MessageInput({ sendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex bg-slate-500 p-3 sticky bottom-0 w-full">
      <input
        className="flex-1 text-black p-2 rounded-l"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        className="bg-black hover:bg-blue-700 text-white p-2 rounded-r"
        onClick={handleSend}
      >
        ↪
      </button>
    </div>
  );
}

export default MessageInput;