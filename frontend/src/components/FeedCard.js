// component/FeedCard.js
import React from 'react';

const FeedCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-600">
      <div className="flex items-center">
        <img
          src={post.author.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{post.author.name}</h2>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>{post.content}</p>
        {post.media && (
          <img
            src={post.media}
            alt="Post media"
            className={`w-full mt-4 rounded-lg ${post.size}`}
          />
        )}
      </div>
      <div className="mt-4 flex justify-between text-gray-600">
        <button className="flex items-center">
          <i className="fas fa-thumbs-up mr-2"></i>Like
        </button>
        <button className="flex items-center">
          <i className="fas fa-comment-alt mr-2"></i>Comment
        </button>
        <button className="flex items-center">
          <i className="fas fa-share mr-2"></i>Share
        </button>
      </div>
    </div>
  );
};

export default FeedCard;

