import React, { useState } from "react";
import axios from "axios"; // Import axios

function EditProfilePosts({ chatId }) {
  const [post, setPost] = useState("");

  const handleSubmit = async () => {
    if (!post.trim()) {
      console.log("Post content is empty.");
      return;
    }

    try {
      const response = await axios.post(
        `https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/userPosts/newPost/${chatId}`,
        {
          text: post,
        }
      );

      console.log("Post added successfully:", response.data);
      setPost(""); // Clear the post input after sending
    } catch (error) {
      console.error(
        "Error submitting post:",
        error.response ? error.response.data : "Unknown error"
      );
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md flex flex-col space-y-4">
    <textarea
      className="w-full h-24 p-4 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      placeholder="Поділіться своїми думками з іншими ..."
      value={post}
      onChange={(e) => setPost(e.target.value)}
    ></textarea>
    <div className="flex justify-end">
      <button
        className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        onClick={handleSubmit}
      >
        Опублікувати
      </button>
    </div>
  </div>
  );
}

export default EditProfilePosts;
