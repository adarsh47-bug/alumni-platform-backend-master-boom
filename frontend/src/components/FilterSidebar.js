import React from 'react';

const FilterSidebar = ({ filters, onFilterChange }) => {
  return (
    <div className='flex flex-col space-y-4'>
      <div className="filter-sidebar p-4 bg-[#cfcfcf09] h-fit rounded-lg">
        <h2 className="text-xl font-bold mb-4">Filter Jobs</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location}
            onChange={onFilterChange}
            placeholder='e.g. Bangalore'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Job Type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={onFilterChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        {/* Add more filters as needed */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
            Salary
          </label>
          <select
            id="salary"
            name="salary"
            value={filters.salary}
            onChange={onFilterChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Salary Range</option>
            <option value="less-than-50k">Less than ₹50K</option>
            <option value="50k-to-100k">₹50Kto ₹100K</option>
            <option value="100k-to-150k">₹100K to ₹150K</option>
            <option value="150k-to-200k">₹150K to ₹200K</option>
            <option value="more-than-200k">More than ₹200K</option>
          </select>
        </div>
      </div>
      <div className="filter-sidebar p-4 bg-[#cfcfcf09] h-fit rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="keyword">
            Keyword Search
          </label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={filters.keyword}
            onChange={onFilterChange}
            placeholder='e.g. React Developer'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        // onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;