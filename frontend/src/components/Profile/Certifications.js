import React from 'react';

const Certifications = ({ certifications }) => {
  return (
    <article id="certifications" className="w-full rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Certifications</h2>
      {certifications.length > 0 ? (
        <ul className="list-disc list-inside text-gray-300">
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300">No certifications listed.</p>
      )}
    </article>
  );
};

export default Certifications;
