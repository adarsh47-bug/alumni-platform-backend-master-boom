// src/components/ProfileDetailSection.js
import React from 'react';

const ProfileDetailSection = ({ title, details }) => {
  return (
    <section className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <ul className="text-gray-600 space-y-1">
        {Object.keys(details).map((key, index) => (
          <li key={index}>
            <strong>{key}:</strong> {details[key]}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProfileDetailSection;
