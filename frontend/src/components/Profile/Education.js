import React from 'react';

const Education = ({ education }) => {
  return (
    <article id="education" className="w-full rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Education</h2>
      {education.length > 0 ? (
        education.map((edu, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold text-white">{edu.degree} at {edu.institution}</h3>
            <p className="text-gray-300">{edu.year}</p>
            <p className="text-gray-300">{edu.description}</p>
            {edu.images && edu.images.length > 0 && (
              <div className="flex flex-wrap mt-2">
                {edu.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`Edu ${idx}`} className="w-32 h-32 object-cover mr-2 mb-2 rounded" />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-300">No education details available.</p>
      )}
    </article>
  );
};

export default Education;
