import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Settings = () => {
  const { user } = useContext(AuthContext);

  // State for the profile details
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contactNumber: '',
    bio: '',
    universityName: '',
    education: [{ degree: '', institution: '', year: '', description: '', images: [] }],
    experience: [{ position: '', company: '', startDate: '', endDate: '', description: '' }],
    skills: [],
    projects: [],
    certifications: [],
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get('/api/users/profile', config);
      setProfile(data);
    };
    fetchProfile();
  }, [user]);

  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      // For array fields like education, experience, etc.
      const updatedSection = [...profile[section]];
      updatedSection[index][name] = value;
      setProfile({ ...profile, [section]: updatedSection });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  // const handleSkillChange = (e, index) => {
  //   const updatedSkills = [...profile.skills];
  //   updatedSkills[index] = e.target.value;
  //   setProfile({ ...profile, skills: updatedSkills });
  // };

  const addNewItem = (section) => {
    const newItem = { degree: '', institution: '', year: '', description: '', images: [] };
    setProfile({ ...profile, [section]: [...profile[section], newItem] });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put('/api/users/profile', profile, config);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.put('/api/users/profile/password', passwords, config);
      setPasswords({ currentPassword: '', newPassword: '' });
      alert('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Settings</h1>

      <form onSubmit={handleProfileSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6 space-y-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Edit Profile</h2>

        {/* Basic Details */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={profile.contactNumber}
            onChange={handleInputChange}
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
          ></textarea>
        </div>

        {/* Education */}
        <h2 className="text-xl font-bold text-gray-700 mb-4">Education</h2>
        {profile.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">Degree</label>
              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">Institution</label>
              <input
                type="text"
                name="institution"
                value={edu.institution}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">Year</label>
              <input
                type="text"
                name="year"
                value={edu.year}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">Description</label>
              <textarea
                name="description"
                value={edu.description}
                onChange={(e) => handleInputChange(e, 'education', index)}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
              ></textarea>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addNewItem('education')}
          className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Education
        </button>

        {/* Experience */}
        <h2 className="text-xl font-bold text-gray-700 mb-4">Experience</h2>
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">Position</label>
              <input
                type="text"
                name="position"
                value={exp.position}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">Company</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">End Date</label>
              <input
                type="date"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold">Description</label>
              <textarea
                name="description"
                value={exp.description}
                onChange={(e) => handleInputChange(e, 'experience', index)}
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
              ></textarea>
            </div>
          </div>
        ))}
        <div className='flex flex-col items-start'>
          <button
            type="button"
            onClick={() => addNewItem('experience')}
            className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Experience
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 mt-4"
          >
            Save Changes
          </button>
        </div>
      </form>

      <form onSubmit={handlePasswordSubmit} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Change Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700"
          />
        </div>
        <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
