import React, { useState } from 'react';

function ProfilePosts() {
  const [post, setPost] = useState('');

  const handleSubmit = () => {
    console.log("Post content:", post); // Replace with your submit logic
    setPost(''); // Clear the textarea after submit
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <textarea
        className="w-full h-20 p-4 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Що у Вас на думці? ..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>
      <button
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        onClick={handleSubmit}
      >
        Опублікувати
      </button>
      <div>posts</div>
    </div>
  );
}

export default ProfilePosts;
