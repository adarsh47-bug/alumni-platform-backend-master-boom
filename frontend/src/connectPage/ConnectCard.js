import React from 'react';

const ConnectCard = ({ name, graduationYear, degree, currentPosition, location, contact, profileImage }) => {
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
        <p><strong>Contact:</strong> {contact}</p>
      </div>

      <div className="mt-6 sm:flex sm:gap-4">
        <a
          className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto"
          href={`mailto:${contact}`}
        >
          Connect with {name}
        </a>

        <a
          className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto"
          href="#"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default ConnectCard;
