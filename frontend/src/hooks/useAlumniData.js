// import { useState, useEffect } from 'react';

// const useAlumniData = () => {
//   const [alumni, setAlumni] = useState([]);

//   useEffect(() => {
//     fetch('/api/users/alumni')
//       .then(response => response.json())
//       .then(data => setAlumni(data))
//       .catch(error => console.error('Error fetching alumni:', error));
//   }, []);

//   return alumni;
// };

// export default useAlumniData;

const alumniData = [
  {
    name: 'John Doe',
    graduationYear: 2018,
    degree: 'B.Tech in Computer Science',
    currentPosition: 'Software Engineer at Google',
    location: 'Mountain View, CA',
    contact: 'john.doe@gmail.com',
    profileImage: 'https://images.unsplash.com/photo-1652278860289-090c869605af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=80'
  },
  {
    name: 'Jane Smith',
    graduationYear: 2016,
    degree: 'BBA in Marketing',
    currentPosition: 'Marketing Manager at Facebook',
    location: 'Menlo Park, CA',
    contact: 'jane.smith@gmail.com',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=faces&fit=crop&w=400&h=400'
  },
  {
    name: 'Michael Lee',
    graduationYear: 2017,
    degree: 'B.Sc in Data Science',
    currentPosition: 'Data Analyst at Amazon',
    location: 'Seattle, WA',
    contact: 'michael.lee@gmail.com',
    profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=faces&fit=crop&w=400&h=400'
  },
  {
    name: 'John Doe',
    graduationYear: 2018,
    degree: 'B.Tech in Computer Science',
    currentPosition: 'Software Engineer at Google',
    location: 'Mountain View, CA',
    contact: 'john.doe@gmail.com',
    profileImage: 'https://images.unsplash.com/photo-1652278860289-090c869605af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=80'
  },
  {
    name: 'Jane Smith',
    graduationYear: 2016,
    degree: 'BBA in Marketing',
    currentPosition: 'Marketing Manager at Facebook',
    location: 'Menlo Park, CA',
    contact: 'jane.smith@gmail.com',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=faces&fit=crop&w=400&h=400'
  },
  {
    name: 'Michael Lee',
    graduationYear: 2017,
    degree: 'B.Sc in Data Science',
    currentPosition: 'Data Analyst at Amazon',
    location: 'Seattle, WA',
    contact: 'michael.lee@gmail.com',
    profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=faces&fit=crop&w=400&h=400'
  }
];

export default alumniData;