import React, { useState, useRef } from "react";

function MessageInput({ sendMessage }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleSend = () => {
    sendMessage(input);
    setInput("");
    inputRef.current.focus();
  };

  return (
    <div className="flex bg-slate-500 p-3 mb-5 sticky bottom-0 w-full">
      <input
        ref={inputRef}
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
