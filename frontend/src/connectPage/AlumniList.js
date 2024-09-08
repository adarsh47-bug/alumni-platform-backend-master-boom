import React from 'react';
import ConnectCard from '../connectPage/ConnectCard';

const AlumniList = ({ alumni }) => {
  return alumni.length > 0 ? (
    <ul className="flex flex-wrap">
      {alumni.map((mentor, index) => (
        <li key={index} className="m-2">
          <ConnectCard
            name={mentor.name}
            graduationYear={mentor.graduationYear}
            degree={mentor.degree}
            currentPosition={mentor.currentPosition}
            location={mentor.location}
            contact={mentor.contact}
            profileImage={mentor.profileImage}
          />
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-600">No Connections available at the moment. Please check back later.</p>
  );
};

export default AlumniList;
