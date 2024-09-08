import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import { useLocation } from 'react-router-dom';
import MessagingComponent from '../components/MessagingComponent';

// Card component for displaying individual alumni details and connection status
const ConnectCard = ({
  name,
  graduationYear,
  degree,
  currentPosition,
  location,
  contact,
  profileImage,
  isConnected = false,
  userId,
  onConnected,
  connected = false,
}) => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 w-[30vw]" role="alert">
      <div className="flex items-center gap-4">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="shrink-0 rounded-full w-16 h-16 object-cover border-2 border-blue-400"
        />
        <div>
          <p className="font-bold text-lg text-gray-800">{name}</p>
          <p className="text-sm text-gray-600">{degree} - Class of {graduationYear}</p>
        </div>
      </div>
      <div className="mt-4 text-gray-600">
        <p><strong>Current Position:</strong> {currentPosition}</p>
        <p><strong>Location:</strong> {location}</p>
        <p>
          <strong>Contact:</strong>
          <a href={`mailto:${contact}`} className="text-blue-500 no-underline"> {contact}</a>
        </p>
      </div>
      <div className="mt-6 sm:flex sm:gap-4">
        {!isConnected && (
          <button
            className={`inline-block w-full rounded-lg px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto ${connected ? 'bg-red-300' : 'bg-blue-500'}`}
            onClick={onConnected}
          >
            {connected ? 'Connected' : `Connect with ${name}`}
          </button>
        )}
        <Link
          to={`/profile/${userId}`}
          className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

// Card component for displaying group details and join button

const GroupCard = ({ group, onJoin, isJoined }) => {
  const handleJoin = () => {
    if (!isJoined) {
      onJoin(group);
    }
  };

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 w-[30vw] h-[30vh] flex flex-col justify-between" role="alert">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={group.icon}
          alt={`${group.name} icon`}
          className="shrink-0 rounded-full w-16 h-16 object-cover border-2 border-blue-400"
        />
        <div>
          <p className="font-bold text-lg text-gray-800">{group.name}</p>
          <p className="text-sm text-gray-600">{group.description}</p>
          <p className="text-sm text-gray-600">Members: {group.members}</p>
        </div>
      </div>
      <div className="mt-auto">
        <button
          className={`inline-block w-full rounded-lg px-5 py-3 text-center text-sm font-semibold text-white ${isJoined ? 'bg-gray-400' : 'bg-blue-500'}`}
          onClick={handleJoin}
          disabled={isJoined}
        >
          {isJoined ? 'Joined' : 'Join Group'}
        </button>
      </div>
    </div>
  );
};

// Form component for creating a new group
const CreateGroupForm = ({ onCreate, onClose }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    icon: '',
    members: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(groupData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Group Name</label>
            <input
              type="text"
              name="name"
              value={groupData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={groupData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Icon URL</label>
            <input
              type="text"
              name="icon"
              value={groupData.icon}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component for rendering a list of alumni connections
const AlumniList = ({ alumni, isConnectedTab, onConnect }) => {
  return alumni.length > 0 ? (
    <ul className="flex flex-wrap">
      {alumni.map((alumnus, index) => (
        <li key={index} className="m-2">
          <ConnectCard
            name={alumnus.name}
            graduationYear={alumnus.graduationYear}
            degree={alumnus.degree}
            currentPosition={alumnus.currentPosition}
            location={alumnus.location}
            contact={alumnus.contact}
            profileImage={alumnus.profileImage}
            isConnected={isConnectedTab}
            userId={alumnus.userId}
            connected={isConnectedTab}
            onConnected={() => onConnect(alumnus)}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-600">No connections available.</p>
  );
};

// Sidebar component for navigation

const Sidebar = ({ navigation, activeTab, onTabClick }) => {
  return (
    <div className="w-[20%] h-screen flex flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <ul className="mt-6 space-y-1">
          {navigation.map((item, index) => (
            <li key={index}>
              {item.options ? (
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <ul className="mt-2 space-y-1 px-4">
                    {item.options.map((subItem, subIndex) => (
                      <li key={subIndex} className="flex flex-row items-center">
                        <button
                          onClick={() => onTabClick(subItem.name)}
                          className={`block w-full text-left rounded-lg px-4 py-2 text-sm font-medium ${activeTab === subItem.name ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        >
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <button
                  onClick={() => onTabClick(item.name)}
                  className={`block w-full text-left rounded-lg px-4 py-2 text-sm font-medium ${activeTab === item.name ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const navigation = [
  { name: 'Explore connections' },
  { name: 'My connections' },
  {
    name: 'Connection requests',
    options: [
      { name: 'Received' },
      { name: 'Sent' }
    ]
  },
  { name: 'Explore Groups' },
  { name: 'My Groups' },
  { name: 'Alumni Connections' },
  { name: 'Students Connections' },
  { name: 'Messaging' },
];

// Initial alumni data
const initialAlumniData = {
  'Explore connections': [
    {
      name: 'John Doe',
      graduationYear: 2018,
      degree: 'B.Tech in Computer Science',
      currentPosition: 'Software Engineer at Google',
      location: 'Mountain View, CA',
      contact: 'john.doe@gmail.com',
      profileImage: 'https://images.unsplash.com/photo-1652278860289-090c869605af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=80',
      userId: '1'
    },
    {
      name: 'Jane Smith',
      graduationYear: 2016,
      degree: 'BBA in Marketing',
      currentPosition: 'Marketing Manager at Facebook',
      location: 'Menlo Park, CA',
      contact: 'jane.smith@gmail.com',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=faces&fit=crop&w=400&h=400',
      userId: '2'
    },
  ],
  'My connections': [],
};

const initialGroupsData = [
  {
    name: 'Group 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: 'https://example.com/group1-icon.png',
    members: 10,
  },
  {
    name: 'Group 2',
    description: 'Praesent euismod justo nec mauris consectetur, id lacinia ligula tincidunt.',
    icon: 'https://example.com/group2-icon.png',
    members: 5,
  },
  {
    name: 'Group 3',
    description: 'Nullam auctor elit at semper ultricies.',
    icon: 'https://example.com/group3-icon.png',
    members: 8,
  },
];

// Main ConnectPage component

const ConnectPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Explore connections');
  const [alumniData, setAlumniData] = useState(initialAlumniData);
  const [groups, setGroups] = useState(initialGroupsData);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [messages, setMessages] = useState([])


  // useEffect(() => {
  //   const fetchAlumniData = async () => {
  //     try {
  //       const response = await fetch('/api/users/alumni');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setAlumniData(data);
  //     } catch (error) {
  //       console.error('Error fetching alumni:', error);
  //     }
  //   };

  //   fetchAlumniData();
  // }, []);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    const userId = params.get('userId');
    if (tab) {
      setActiveTab(tab);
      if (tab === 'Messaging' && userId) {
        const user = initialAlumniData['Explore connections'].find(alumnus => alumnus.userId === userId);
        if (user) {
          setMessages(prevMessages => [...prevMessages, { userId, name: user.name, profileImage: user.profileImage, message: `Started a conversation with ${user.name}` }]);
        }
      }
    }
  }, [location.search]);


  const handleConnect = (alumnus) => {
    setAlumniData((prevData) => {
      const newConnections = [...prevData['My connections'], alumnus];
      const updatedExploreConnections = prevData['Explore connections'].filter(
        (exploreAlumnus) => exploreAlumnus.userId !== alumnus.userId
      );
      return {
        ...prevData,
        'My connections': newConnections,
        'Explore connections': updatedExploreConnections,
      };
    });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleCreateGroup = (groupData) => {
    setGroups((prevGroups) => [...prevGroups, groupData]);
  };

  const handleJoinGroup = (group) => {
    setJoinedGroups((prevGroups) => [...prevGroups, group]);
  };

  return (
    <Wrapper>
      <Sidebar
        navigation={navigation}
        activeTab={activeTab}
        onTabClick={handleTabClick}
      />
      <div className="w-[80%] p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">{activeTab}</h1>
        {activeTab === 'My Groups' && (
          <div>
            <button
              onClick={() => setShowCreateGroupForm(true)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Create Group
            </button>
            <ul className="flex flex-wrap">
              {joinedGroups.map((group, index) => (
                <li key={index} className="m-2">
                  <GroupCard group={group} onJoin={handleJoinGroup} isJoined={true} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'Explore Groups' && (
          <div>
            <ul className="flex flex-wrap">
              {groups.map((group, index) => (
                <li key={index} className="m-2">
                  <GroupCard group={group} onJoin={handleJoinGroup} isJoined={joinedGroups.includes(group)} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {(activeTab === 'Explore connections' || activeTab === 'My connections') && (
          <AlumniList
            alumni={alumniData[activeTab] || []}
            isConnectedTab={activeTab === 'My connections'}
            onConnect={handleConnect}
          />
        )}
        {activeTab === 'Messaging' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            {/* {messages.length > 0 ? (
              <ul>
                {messages.map((msg, index) => (
                  <li key={index} className="mb-2 p-2 border rounded-lg flex flex-row">
                    <img src={msg.profileImage} alt={msg.name} className="w-8 h-8 rounded-full object-cover mx-4" />
                    <p><strong>{msg.name}:</strong> {msg.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No messages available.</p>
            )} */}
            <MessagingComponent activeTab={activeTab} messages={messages} />
          </div>
        )}
      </div>
      {showCreateGroupForm && (
        <CreateGroupForm
          onCreate={handleCreateGroup}
          onClose={() => setShowCreateGroupForm(false)}
        />
      )}
    </Wrapper>
  );
};

export default ConnectPage;
