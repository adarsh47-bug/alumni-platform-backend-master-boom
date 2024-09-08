import React, { useState } from 'react';
import axios from 'axios';

function PostForm() {
  const [text, setText] = useState('');
  const [mediaLinks, setMediaLinks] = useState([]); // Array to store media links
  const [type, setType] = useState('text');
  const [visibility, setVisibility] = useState('public');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    formData.append('type', type);
    formData.append('visibility', visibility);
    formData.append('media', mediaLinks); // Append media links as an array

    try {
      await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setText('');
      setMediaLinks([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">

      <textarea
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
      />

      {/* Select for post type */}
      <select value={type} onChange={handleTypeChange} className="mt-2 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring">
        <option value="text">Text</option>
        <option value="media">Media</option>
        {/* Add more options for newsletter if needed */}
      </select>

      {/* Select for post visibility */}
      <select value={visibility} onChange={handleVisibilityChange} className="mt-2 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring">
        <option value="public">Public</option>
        <option value="alumni">Alumni Only</option>
        {/* Add more options for group visibility if needed */}
      </select>

      {/* Input for media links */}
      <input
        type="text"
        placeholder="Enter media link"
        value={mediaLinks.join(', ')}
        onChange={(e) => setMediaLinks(e.target.value.split(', '))}
        className="mt-2 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
      />

      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Post
      </button>
    </form>
  );
}

export default PostForm;