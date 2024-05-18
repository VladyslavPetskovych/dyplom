import React, { useState } from "react";
import axios from "axios";

function EditPostModal({ post, onClose, onSave, chatId }) {
  const [text, setText] = useState(post.text);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/userPosts/editPost/${chatId}/${post._id}`,
        { text }
      );
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
        <textarea
          className="w-full h-28 p-4 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPostModal;
