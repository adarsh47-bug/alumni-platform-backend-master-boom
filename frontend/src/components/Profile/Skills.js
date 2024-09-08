import React from 'react';

const Skills = ({ skills }) => {
  return (
    <article id="skills" className="w-full rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Skills</h2>
      {skills.length > 0 ? (
        <ul className="list-disc list-inside text-gray-300">
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">No skills listed.</p>
      )}
    </article>
  );
};

export default Skills;
