import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Wrapper from '../components/Wrapper';
import ConnectCard from './ConnectCard';
import useAlumniData from '../hooks/useAlumniData';

import { navigation } from './navigation';

const ConnectionReqReceived = () => {
  // const [alumni, setAlumni] = useState(useAlumniData());
  const [alumni, setAlumni] = useState(useAlumniData);

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch('/api/users/alumni')
      .then(response => response.json())
      .then(data => setAlumni(data))
      .catch(error => console.error('Error fetching alumni:', error));
  }, []);

  return (
    <Wrapper children={
      <>
        <Sidebar navigation={navigation} />
        <div className="w-[80%] p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Connections requests received</h1>
          {alumni.length > 0 ? (
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
          )}
        </div>
      </>
    } />
  );
};

export default ConnectionReqReceived;
