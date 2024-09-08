import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Wrapper from '../components/Wrapper'; // Reusable Wrapper for layout
import FilterSidebar from '../components/FilterSidebar'; // Sidebar component for filtering jobs
import JobCard from '../components/jobCard'; // Card component for each job listing

// Sample job data (can be replaced by data from an API)

const dummyJobs = [
  {
    _id: "1",
    title: "Software Engineer",
    description: "Develop and maintain web applications using MERN stack. Collaborate with cross-functional teams.",
    company: "Tech Innovators Inc.",
    location: "New York, NY",
    salary: "₹80,000 - ₹100,000",
    type: "Full-time",
    postedDate: "2023-10-01",
    applicationDeadline: "2023-11-01",
    requirements: "Bachelor's degree in Computer Science or related field. 2+ years of experience in web development.",
    responsibilities: "Develop and maintain web applications. Collaborate with cross-functional teams. Write clean and efficient code.",
    logo: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRlY2h8ZW58MHx8fHwxNjE5NjY5MjY4&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    _id: "2",
    title: "Marketing Specialist",
    description: "Design marketing campaigns and manage social media accounts.",
    company: "Global Market Co.",
    location: "Los Angeles, CA",
    salary: "₹50,000 - ₹70,000",
    type: "Full-time",
    postedDate: "2023-09-15",
    applicationDeadline: "2023-10-15",
    requirements: "Bachelor's degree in Marketing or related field. 1+ years of experience in marketing.",
    responsibilities: "Design marketing campaigns. Manage social media accounts. Analyze marketing data.",
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1hcmtldGluZ3xlbnwwfHx8fDE2MTk2NjkyNjg&ixlib=rb-1.2.1&q=80&w=400"
  },
  {
    _id: "3",
    title: "Data Scientist",
    description: "Analyze large datasets and build predictive models.",
    company: "DataWorks LLC",
    location: "San Francisco, CA",
    salary: "₹90,000 - ₹120,000",
    type: "Full-time",
    postedDate: "2023-09-20",
    applicationDeadline: "2023-10-20",
    requirements: "Master's degree in Data Science or related field. 3+ years of experience in data analysis.",
    responsibilities: "Analyze large datasets. Build predictive models. Collaborate with data engineering team.",
    logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGRhdGF8ZW58MHx8fHwxNjE5NjY5MjY4&ixlib=rb-1.2.1&q=80&w=400"
  }
];

const JobsPage = () => {
  const [jobs, setJobs] = useState(dummyJobs); // Jobs state, initialized with dummy data
  const [filteredJobs, setFilteredJobs] = useState(jobs); // State for filtered jobs
  const [filters, setFilters] = useState({ location: '', type: '' }); // State for filters

  // Fetch jobs from API (if needed)
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const { data } = await axios.get('/api/jobs');
  //       setJobs(data);
  //       setFilteredJobs(data); // Initialize with all jobs
  //     } catch (error) {
  //       console.error('Error fetching jobs:', error);
  //     }
  //   };
  //   fetchJobs();
  // }, []);

  // Handle filter changes (updates filteredJobs based on current filters)
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    // Filter jobs based on selected criteria
    const filtered = jobs.filter((job) => {
      const locationMatch = filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase());
      const typeMatch = filters.type === '' || job.type.toLowerCase() === filters.type.toLowerCase();
      return locationMatch && typeMatch;
    });

    setFilteredJobs(filtered);
  };

  // Form for adding new job listings
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupVisible]);


  // Form for adding new job listings
  const AddJobForm = () => (
    <form className="p-6 mb-6 overflow-y-scroll h-[75vh]">
      {/* <h2 className="text-xl font-bold mb-4">Add New Job</h2> */}

      {['title', 'description', 'company', 'location', 'salary', 'logo'].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={field === 'salary' || field === 'logo' ? 'text' : 'text'}
            id={field}
            name={field}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}

      {['type', 'postedDate', 'applicationDeadline'].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <input
            type={field.includes('Date') ? 'date' : 'text'}
            id={field}
            name={field}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requirements">
          Requirements
        </label>
        <textarea
          id="requirements"
          name="requirements"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="responsibilities">
          Responsibilities
        </label>
        <textarea
          id="responsibilities"
          name="responsibilities"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Job
      </button>
    </form>
  );

  return (
    <Wrapper>
      <>

        {/* Popup for job form */}
        {isPopupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg relative w-[50%] scale-[90%]">
              <div className='px-6'>
                <h2 className=" text-xl font-bold mb-4 ">Add New Job</h2>
                <button
                  className="absolute top-2 right-2 border border-gray-500 rounded-lg px-2 py-1 mb-2 hover:bg-red-500"
                  onClick={togglePopup}
                >
                  Close
                </button>
              </div>
              {/* The form component for creating a job */}
              <AddJobForm />
            </div>
          </div>
        )}

        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />

          {/* Main content - Job Listings */}
          <div className="w-[80%] p-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">Job Listings</h1>

            {/* Add Job Form */}
            <div className={`flex flex-col items-center mt-6 ${isPopupVisible ? 'blur-sm' : ''}`}>
              <div onClick={togglePopup} id='postbox' className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-600 w-[100%]">
                <div className="flex items-center gap-4">

                  <div className='w-[84%]'>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 font-medium" placeholder="Create a job here." />
                  </div>

                  <button className='rounded-full  bg-blue-400 text-white font-semibold text-sm p-2 px-8 '>
                    Create Job
                  </button>

                </div>
              </div>
            </div>

            {/* Job listings */}
            {filteredJobs.length > 0 ? (
              <ul>
                {filteredJobs.map((job) => (
                  <li key={job._id} className="mb-4">
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No jobs available.</p>
            )}
          </div>
        </div>
      </>
    </Wrapper >
  );
};

export default JobsPage;
