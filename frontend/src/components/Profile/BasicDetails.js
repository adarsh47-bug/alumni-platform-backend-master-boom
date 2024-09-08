import React from 'react';

const BasicDetails = ({ profile }) => {
  return (
    <article id="basic-details" className="w-full rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Basic Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <p className="text-gray-300"><strong>Name:</strong> {profile.name || 'N/A'}</p>
        <p className="text-gray-300"><strong>Email:</strong> {profile.email || 'N/A'}</p>
        <p className="text-gray-300"><strong>Contact Number:</strong> {profile.contactNumber || 'N/A'}</p>
        <p className="text-gray-300"><strong>Bio:</strong> {profile.bio || 'No bio available'}</p>
        <p className="text-gray-300"><strong>University:</strong> {profile.universityName || 'N/A'}</p>
        <p className="text-gray-300"><strong>Account Created:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
      </div>
    </article>
  );
};

export default BasicDetails;
