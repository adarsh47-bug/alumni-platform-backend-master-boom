import React, { useState, useEffect } from 'react';

const MessagingComponent = ({ activeTab }) => {
  const [messages, setMessages] = useState([
    // Initial messages for demonstration
    { name: 'Alice', message: 'Hello!', profileImage: 'https://via.placeholder.com/40' },
    { name: 'Bob', message: 'Hi there!', profileImage: 'https://via.placeholder.com/40' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = { name: 'You', message: newMessage, profileImage: 'https://via.placeholder.com/40' };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      // Simulate receiving a reply
      setTimeout(() => {
        const replyMsg = { name: 'Alice', message: 'Got your message!', profileImage: 'https://via.placeholder.com/40' };
        setMessages((prevMessages) => [...prevMessages, replyMsg]);
      }, 1000);
    }
  };

  useEffect(() => {
    // Simulate receiving messages dynamically
    const interval = setInterval(() => {
      const newIncomingMessage = {
        name: 'Bob',
        message: 'This is a new incoming message!',
        profileImage: 'https://via.placeholder.com/40'
      };
      setMessages((prevMessages) => [...prevMessages, newIncomingMessage]);
    }, 10000); // Receive a new message every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    activeTab === 'Messaging' && (
      <div className="flex flex-col h-full border rounded-lg shadow-lg">
        <header className="bg-green-600 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Messages</h2>
        </header>
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          {messages.length > 0 ? (
            <ul>
              {messages.map((msg, index) => (
                <li key={index} className="mb-4 p-2 bg-white border rounded-lg flex items-start">
                  <img src={msg.profileImage} alt={msg.name} className="w-10 h-10 rounded-full object-cover mr-4" />
                  <div>
                    <p className="font-bold">{msg.name}</p>
                    <p>{msg.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No messages available.</p>
          )}
        </div>
        <div className="p-4 bg-white border-t flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg mr-4"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    )
  );
};

export default MessagingComponent;