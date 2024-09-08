import React from 'react';

const Experience = ({ experience }) => {
  return (
    <article id="experience" className="w-full rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Experience</h2>
      {experience.length > 0 ? (
        experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold text-white">{exp.position} at {exp.company}</h3>
            <p className="text-gray-300">
              {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
            </p>
            <p className="text-gray-300">{exp.description}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-300">No experience details available.</p>
      )}
    </article>
  );
};

export default Experience;
