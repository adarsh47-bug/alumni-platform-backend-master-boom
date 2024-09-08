import React from 'react';

const Projects = ({ projects }) => {
  return (
    <article id="projects" className="w-full rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Projects</h2>
      {projects.length > 0 ? (
        <ul className="list-disc list-inside text-gray-300">
          {projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">No projects listed.</p>
      )}
    </article>
  );
};

export default Projects;
