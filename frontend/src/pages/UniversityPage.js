// src/pages/UniversityPage.js
import React, { useState } from 'react';
import Wrapper from '../components/Wrapper';
import ConnectCard from '../connectPage/ConnectCard';

const navigation = [
  { name: 'MNIT, Jaipur' },
  { name: 'BITS, Pilani' },
  { name: 'JUET, Guna' },
  { name: 'RTU, Kota' },
  {
    name: 'Jaipur National University, Jaipur',
    options: [
      { name: 'COET, Bikaner' },
      { name: 'JECRC, Jaipur' },
      { name: 'SKIT, Jaipur' },
      { name: 'GEC, Ajmer' },
      { name: 'GEC, Bharatpur' },
    ]
  }
];

// Sample alumni data (you can replace this with actual fetched data)
const alumniData = {
  'MNIT, Jaipur': [
    { name: 'John Doe', graduationYear: 2015, degree: 'B.Tech', currentPosition: 'Software Engineer', location: 'Pune', contact: 'john@example.com', profileImage: 'https://plus.unsplash.com/premium_photo-1672243483821-5d3855a21809?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Jane Smith', graduationYear: 2018, degree: 'B.Tech', currentPosition: 'Data Analyst', location: 'Bangalore', contact: 'jane@example.com', profileImage: 'https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ],
  'BITS, Pilani': [
    { name: 'Alice Johnson', graduationYear: 2017, degree: 'B.Tech', currentPosition: 'Product Manager', location: 'Mumbai', contact: 'alice@example.com', profileImage: 'https://plus.unsplash.com/premium_photo-1672243483821-5d3855a21809?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Bob Brown', graduationYear: 2016, degree: 'B.Tech', currentPosition: 'DevOps Engineer', location: 'Hyderabad', contact: 'bob@example.com', profileImage: 'https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ],
  // Add more alumni data for other universities
};


const Sidebar = ({ navigation, onClickUniversity, activeUniversity }) => {
  return (
    <div className="w-[20%] flex h-screen flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <ul className="mt-6 space-y-1">
          {navigation.map((item, index) => (
            <li key={index}>
              {item.options ? (
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  {/* Submenu for options */}
                  <ul className="mt-2 space-y-1 px-4">
                    {item.options.map((subItem, subIndex) => (
                      <li key={subIndex} className='flex flex-row items-center'>
                        <button
                          onClick={() => onClickUniversity(subItem.name)}
                          className={`block w-full text-left rounded-lg px-4 py-2 text-sm font-medium ${activeUniversity === subItem.name ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        >
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <button
                  onClick={() => onClickUniversity(item.name)}
                  className={`block w-full text-left rounded-lg px-4 py-2 text-sm font-medium ${activeUniversity === item.name ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const UniversityPage = () => {
  const [selectedUniversity, setSelectedUniversity] = useState('MNIT, Jaipur');

  // Handle university selection
  const handleUniversityClick = (universityName) => {
    setSelectedUniversity(universityName);
  };

  return (
    <Wrapper children={
      <>
        <Sidebar
          navigation={navigation}
          onClickUniversity={handleUniversityClick} // Pass the click handler to Sidebar
          activeUniversity={selectedUniversity} // Pass the active university
        />
        <div className="w-[80%] p-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-1">Universities</h1>
          <p className="text-lg text-gray-700 mb-2">
            Select a university to view the alumni.
          </p>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">{selectedUniversity} Alumni</h2>

            {alumniData[selectedUniversity] ? (
              <div className="flex flex-wrap">
                {alumniData[selectedUniversity].map((alumnus, index) => (
                  <div key={index} className="m-2">
                    <ConnectCard
                      key={index}
                      name={alumnus.name}
                      graduationYear={alumnus.graduationYear}
                      degree={alumnus.degree}
                      currentPosition={alumnus.currentPosition}
                      location={alumnus.location}
                      contact={alumnus.contact}
                      profileImage={alumnus.profileImage}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No alumni available for {selectedUniversity}.</p>
            )}
          </div>
        </div>
      </>
    } />
  );
};

export default UniversityPage;
