import React from "react";
import axios from "axios";

function DeletePostModal({ post, onClose, onDelete,chatId }) {
  const handleDelete = async () => {
    try {
        console.log(post)
      await axios.delete(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/deletePost/${chatId}/${post._id}`
      );
      onDelete();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Delete Post</h2>
        <p>Are you sure you want to delete this post?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePostModal;
