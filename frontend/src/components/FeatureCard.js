// frontend/src/components/FeatureCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, link }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <Link to={link} className="block mt-4 text-blue-500 hover:underline">
        Learn More
      </Link>
    </div>
  );
};

export default FeatureCard;
