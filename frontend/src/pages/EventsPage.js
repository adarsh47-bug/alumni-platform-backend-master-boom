// src/pages/EventsPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import Wrapper from '../components/Wrapper';

const EventCard = ({ event, onRegister }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
    <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
    <div className="p-4 flex-grow">
      <h3 className="text-xl font-semibold text-blue-700">{event.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{event.date}, {event.time}</p>
      <p className="text-sm text-gray-500 mt-1">{event.location}</p>
      <p className="text-gray-700 mt-4">{event.description}</p>
    </div>
    <div className="p-4 bg-gray-50 flex justify-between items-center">
      <button
        onClick={onRegister}
        className={`px-4 py-2 rounded-md text-white ${event.isRegistered ? 'bg-red-500' : 'bg-blue-500'}`}
      >
        {event.isRegistered ? 'Unregister' : 'Register'}
      </button>
    </div>
  </div>
);

const navigation = [
  { name: 'All Events' },
  { name: 'My Registered Events' },
  { name: 'Alumni Meetups' },
  { name: 'Motivational Talks' },
  { name: 'Success Stories' },
  { name: 'Panel Discussions' },
  { name: 'Q&A Sessions' },
  { name: 'Tech Sessions' },
];

const Sidebar = ({ navigation, activeCategory, onCategoryClick }) => (
  <div className="w-[20%] h-screen border-r bg-white">
    <div className="px-4 py-6">
      <ul className="space-y-1">
        {navigation.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onCategoryClick(item.name)}
              className={`block w-full text-left rounded-lg px-4 py-2 text-sm font-medium ${activeCategory === item.name
                ? 'bg-gray-100 text-blue-700'
                : 'text-gray-500 hover:bg-gray-100 hover:text-blue-700'
                }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const EventsData = [
  {
    title: 'Alumni Meetup',
    date: '12th October 2023',
    time: '10:00 AM - 12:00 PM',
    location: 'Online',
    description: 'Join us for a virtual alumni meetup to connect with your batchmates.',
    isRegistered: false,
    category: 'Alumni Meetups',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Success Stories',
    date: '15th October 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'Online',
    description: 'Hear inspiring stories from successful alumni.',
    isRegistered: false,
    category: 'Success Stories',
    imageUrl: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Panel Discussion',
    date: '18th October 2023',
    time: '3:00 PM - 5:00 PM',
    location: 'Online',
    description: 'Experts discuss the latest tech trends and share insights.',
    isRegistered: false,
    category: 'Panel Discussions',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Events');
  const [events, setEvents] = useState(EventsData);
  const navigate = useNavigate();  // useNavigate for navigation

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleRegistration = (event) => {
    // Navigate to the event details page, passing event data via state
    navigate(`/event-details/${event.title}`, { state: { event } });
  };

  const filteredEvents = activeCategory === 'All Events'
    ? events
    : activeCategory === 'My Registered Events'
      ? events.filter(event => event.isRegistered)
      : events.filter(event => event.category === activeCategory);

  return (
    <Wrapper>
      <div className="flex w-[100vw]">
        <Sidebar navigation={navigation} activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
        <div className="w-[80%] p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-800">{activeCategory}</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onRegister={() => handleRegistration(event)}  // Pass event to handleRegistration
              />
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EventsPage;
