import { type } from '@testing-library/user-event/dist/type';
import React from 'react';

function Post({ post }) {
  const { user, content, text, media, type, visibility, createdAt, likes, comments } = post;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      {/* Header */}
      <div className="flex items-start space-x-4">
        <img
          src={user?.profilePicture || '/default-profile.png'}
          alt={user?.name || 'Profile'}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user?.name || 'Anonymous'}</p>
          <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
          <p className={`text-xs mt-1 ${visibility === 'public' ? 'text-green-500' : 'text-blue-500'}`}>
            {visibility}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-4">
        {type === 'text' && <p>{text}</p>}
        {type === 'media' && media?.length > 0 && (
          <div className="mt-2">
            {media.map((link, index) => (
              <a href={link} target="_blank" rel="noopener noreferrer" key={index}>
                <img src={link} alt={`Media ${index}`} className="w-full rounded-lg mb-2 object-cover" />
              </a>
            ))}
          </div>
        )}
        {type === 'newsletter' && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-100">
            <p>{text}</p>
          </div>
        )}
      </div>

      {/* Interaction Buttons */}
      <div className="mt-4 flex items-center space-x-6">
        <button className="text-blue-500 hover:text-blue-700 flex items-center space-x-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>Like ({likes?.length})</span>
        </button>
        <button className="text-blue-500 hover:text-blue-700 flex items-center space-x-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3V1l-4 4 4 4V5c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 19.5 2 14 6.5 4 12 4V3z" />
          </svg>
          <span>Comment ({comments?.length})</span>
        </button>
      </div>

      {/* Comments */}
      {comments?.length > 0 && (
        <div className="mt-4 border-t pt-2">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start mb-2">
              <img
                src={comment.user?.profilePicture || '/default-profile.png'}
                alt={comment.user?.name || 'Profile'}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="ml-3">
                <p className="font-semibold">{comment.user?.name || 'Anonymous'}</p>
                <p className="text-sm text-gray-700">{comment.text}</p>
                <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
