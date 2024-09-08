// frontend/src/pages/HomePage.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import FeedCard from '../components/FeedCard';
import CreatePostForm from '../components/CreatePostForm';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
      },
      content: 'Just had an amazing meeting with the team!',
      media: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      size: 'h-[35rem]',
      timestamp: '2h ago',
    },
    {
      id: 2,
      author: {
        name: 'Jane Smith',
        avatar: 'https://via.placeholder.com/40',
      },
      content: 'Excited to announce our new project.',
      media: 'https://images.unsplash.com/photo-1719937051058-63705ed35502?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      timestamp: '5h ago',
    },
  ]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const { data } = await axios.get('/api/posts');
  //       setPosts(data);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupVisible]);

  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      setUser(null);
      Navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // 
  const [profile, setProfile] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const { data } = await axios.get('/api/users/profile', config);
        // console.log('Fetched profile data:', data); // Log fetched data
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, [user]);


  return (
    <div className='max-lg:flex flex-col items-center'>
      <article className="lg:absolute left-[5%] top-[13%] lg:w-[22%] rounded-xl border border-gray-700 bg-gray-800 p-4 shadow-lg ">
        <div className="flex items-center gap-4">
          <img
            alt=""
            src={user.profileImg}
            className="size-16 rounded-full object-cover "
          />

          <div className='w-[75%]'>
            <h3 className="text-lg font-medium text-white">{user.name}</h3>
            <p className="mt-1 text-xs font-medium text-gray-300">
              {user.type} with the knowledge of  {user.skills?.map((skill, index) =>
                index === user.skills.length - 1 ? skill + '.' : skill + ', '
              )}
            </p>
          </div>

        </div>

        <ul className="mt-4 space-y-2">
          <li>
            <Link to="/profile" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
              <strong className="font-medium text-white">My Profile</strong>
            </Link>
          </li>
          <li>
            <Link to="/" className="block h-full rounded-lg my-1 border border-gray-700 p-4 hover:border-pink-600">
              <strong className="font-medium text-white">My Feeds</strong>
            </Link>
          </li>
          <li>
            <Link to="/" className="block h-full rounded-lg my-1 border border-gray-700 p-4 hover:border-pink-600">
              <strong className="font-medium text-white">Bookmarked Feeds</strong>
            </Link>
          </li>
          <li>
            <Link to="/connect" className="block h-full rounded-lg my-1 border border-gray-700 p-4 hover:border-pink-600">
              <strong className="font-medium text-white">My Groups</strong>
            </Link>
          </li>
          <li>
            <Link to="/events" className="block h-full rounded-lg my-1 border border-gray-700 p-4 hover:border-pink-600">
              <strong className="font-medium text-white">My Events</strong>
            </Link>
          </li>
          <li>
            <Link to="/logout" onClick={handleLogout} className="md:hidden block h-full rounded-lg my-1 border border-gray-700 p-4 hover:border-pink-600">
              <strong className="font-medium text-white">Logout</strong>
            </Link>
          </li>
        </ul>
      </article>

      <div className={`flex flex-row container ${isPopupVisible ? 'blur-sm' : ''}`}>

        <div className="mx-auto  p-4 lg:w-[45%] md:w-[70%] sm:w-[90%]">
          <h1 className="text-2xl font-semibold mb-6">Latest Feeds</h1>
          <div onClick={togglePopup} id='postbox' className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-600">
            <div className="flex items-center gap-4">
              <img
                alt=""
                src={user.profileImg}
                className="size-12 rounded-full object-cover "
              />

              <div className='w-[75%]'>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 font-medium" placeholder="Write a post and share your thoughts." />
              </div>

              <button className='rounded-full w-fit bg-blue-400 text-white font-semibold text-sm p-1 '>
                Create Now
              </button>

            </div>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <FeedCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg relative w-[50%] scale-[90%]">
            <button className="absolute top-2 right-2 border border-gray-500 rounded-lg px-2 py-1 hover:bg-red-500" onClick={togglePopup}>
              close
            </button>
            <CreatePostForm onPostCreated={handlePostCreated} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;

