import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 mb-4">
      <div className="flex items-center mb-4">
        {job.logo && (
          <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 mr-4 rounded-full border border-gray-200" />
        )}
        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
      </div>
      <p className="text-gray-700 mb-2">{job.description}</p>
      <p className="text-gray-700 mb-2"><strong>Company:</strong> {job.company}</p>
      <p className="text-gray-700 mb-2"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700 mb-2"><strong>Salary:</strong> {job.salary}</p>
      <p className="text-gray-700 mb-2"><strong>Type:</strong> {job.type}</p>
      <p className="text-gray-700 mb-2"><strong>Posted Date:</strong> {job.postedDate}</p>
      <p className="text-gray-700 mb-2"><strong>Application Deadline:</strong> {job.applicationDeadline}</p>
      <p className="text-gray-700 mb-2"><strong>Requirements:</strong> {job.requirements}</p>
      <p className="text-gray-700 mb-2"><strong>Responsibilities:</strong> {job.responsibilities}</p>
      <div className="mt-6 sm:flex sm:gap-4">
        <button className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto hover:bg-blue-700">
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;