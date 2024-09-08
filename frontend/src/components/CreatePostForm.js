// frontend/src/components/CreatePostForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreatePostForm = ({ onPostCreated }) => {
  const [type, setType] = useState('Article');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/posts', {
        type,
        content,
        mediaUrl,
        title,
        tags,
      });

      onPostCreated(data); // Callback to refresh the post list
      setType('Article');
      setContent('');
      setMediaUrl('');
      setTitle('');
      setTags('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg ">
      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Post Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Article">Article</option>
          <option value="Media">Media</option>
          <option value="Discussion">Discussion Thread</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
      </div>

      {type === 'Media' && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Media URL</label>
          <input
            type="text"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;
