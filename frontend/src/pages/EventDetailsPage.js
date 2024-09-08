import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EventDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize form state regardless of the condition
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentInfo: ''
  });

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // // If no event data exists, redirect to the homepage
  // if (!location.state || !location.state.event) {
  //   navigate('/');
  //   return null;
  // }

  const { event } = location.state;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent page reload
    console.log('Form submitted:', formData);

    // Simulate registration submission (you can replace this with an actual API call)
    alert(`You have successfully registered for ${event.title}`);

    // Redirect to the events page or another page after submission
    navigate('/events');
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover mb-6" />
      <p className="text-xl text-gray-700 mb-4">{event.description}</p>
      <p className="text-sm text-gray-600">{event.date}, {event.time}</p>
      <p className="text-sm text-gray-500 mb-6">{event.location}</p>

      {/* Event registration form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register for this Event</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            required
          />
        </div>

        {event.hasPayment && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Payment Details</label>
            <input
              type="text"
              name="paymentInfo"
              value={formData.paymentInfo}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter payment information"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventDetailsPage;
