import React, { useState, useEffect } from "react";
import EditPostModal from "./editPostModal";
import DeletePostModal from "./deletePostModal";
import { useSelector } from "react-redux";

function UserPosts({ userData }) {
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const chatId = useSelector((state) => state.user.chatId);

  useEffect(() => {
    if (userData && userData.posts) {
      setPosts(userData.posts);
    }
  }, [userData]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("uk-UA", options);
  };

  // Sort posts by creation date in descending order
  const sortedPosts = posts
    ? [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const handleEditClick = (post) => {
    setEditingPost(post);
  };

  const handleDeleteClick = (post) => {
    setDeletingPost(post);
  };

  const updatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div className="flex flex-col items-center mt-5 mb-32 min-h-96 my-10">
      {sortedPosts.length > 0 ? (
        <div className="p-2 w-[85%] border h-full space-y-4 overflow-y-auto bg-white rounded-lg shadow-md">
          {sortedPosts.map((post) => (
            <div key={post._id} className="bg-neutral-100 p-3 rounded relative">
              <p className="text-lg font-medium text-gray-800 p-3">{post.text}</p>
              <p className="text-xs text-gray-500 mt-2">
                {formatDate(post.createdAt)}
              </p>
              <div className="absolute top-2 right-2  flex space-x-2">
                <button
                  className="text-sm text-blue-500"
                  onClick={() => handleEditClick(post)}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-500"
                  onClick={() => handleDeleteClick(post)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading posts or no posts available...</p>
      )}
      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={updatePost}
          chatId={chatId}
        />
      )}
      {deletingPost && (
        <DeletePostModal
          post={deletingPost}
          onClose={() => setDeletingPost(null)}
          onDelete={() => deletePost(deletingPost._id)}
          chatId={chatId}
        />
      )}
    </div>
  );
}

export default UserPosts;
