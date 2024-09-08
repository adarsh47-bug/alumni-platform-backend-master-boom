import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const userId = 'user123';  // Replace with dynamic ID if needed

  // Function to handle sending messages
  const handleSend = async () => {
    if (!input) return;

    console.log('Sending message:', input);

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post(
        'https://general-runtime.voiceflow.com/state/user123', // Replace user123 with dynamic user ID if needed
        {
          request: {
            type: 'text',
            payload: input,
          },
        },
        {
          headers: {
            Authorization: `Bearer VF.DM.66dde1b13d163a064c25c8b5.aeT5XoHIc8xl9PEZ`, // API key from .env
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Voiceflow API Response:', response.data);

      const voiceflowMessages = response.data;

      const botMessages = voiceflowMessages.filter(message => message.type === 'text').map(message => ({
        sender: 'bot',
        text: message.payload.message,
      }));

      setMessages([...newMessages, ...botMessages]);
      setInput(''); // Clear input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Title */}
        <header className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
          <h1 className="text-2xl font-semibold">Career Assistance AI</h1>
        </header>

        {/* Chat Box */}
        <div className="p-6 overflow-auto h-96">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="border-t border-gray-200 p-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-3 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
