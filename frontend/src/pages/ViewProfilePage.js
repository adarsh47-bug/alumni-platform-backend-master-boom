// src/pages/ViewProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileDetailSection from '../components/ProfileDetailSection';

const dummyProfileData = {
  '1': {
    name: 'John Doe',
    graduationYear: 2018,
    degree: 'B.Tech in Computer Science',
    currentPosition: 'Software Engineer at Google',
    location: 'Mountain View, CA',
    contact: 'john.doe@gmail.com',
    bio: 'An enthusiastic software engineer working on cutting-edge technology at Google. Passionate about AI and open-source projects.',
    profileImage: 'https://images.unsplash.com/photo-1652278860289-090c869605af?q=80&w=1887&auto=format&fit=crop',
    additionalInfo: {
      Hobbies: 'Coding, Hiking, Reading',
      LinkedIn: 'https://linkedin.com/in/johndoe',
    },
  },
  '2': {
    name: 'Jane Smith',
    graduationYear: 2016,
    degree: 'BBA in Marketing',
    currentPosition: 'Marketing Manager at Facebook',
    location: 'Menlo Park, CA',
    contact: 'jane.smith@gmail.com',
    bio: 'Experienced marketing manager driving campaigns for global outreach at Facebook. Specializing in digital marketing and consumer behavior.',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=faces&fit=crop&w=400&h=400',
    additionalInfo: {
      Hobbies: 'Photography, Traveling',
      LinkedIn: 'https://linkedin.com/in/janesmith',
    },
  },
  '3': {
    name: "Emily Johnson",
    graduationYear: 2017,
    degree: "MBA in Finance",
    currentPosition: "Financial Analyst at Goldman Sachs",
    location: "New York, NY",
    contact: "emily.johnson@gmail.com",
    profileImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=faces&fit=crop&w=400&h=400",
    bio: 'Experienced marketing manager driving campaigns for global outreach at Facebook. Specializing in digital marketing and consumer behavior.',
    additionalInfo: {
      Hobbies: 'Photography, Traveling',
      LinkedIn: 'https://linkedin.com/in/janesmith',
    },
  },
  '4': {
    name: "Michael Brown",
    graduationYear: 2018,
    degree: "BA in Graphic Design",
    currentPosition: "Creative Director at Adobe",
    location: "San Francisco, CA",
    contact: "michael.brown@gmail.com",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=faces&fit=crop&w=400&h=400",
    bio: "Software engineer with a passion for building scalable applications. Experienced in cloud computing and DevOps.",
    additionalInfo: {
      Hobbies: "Gaming, Cooking",
      LinkedIn: "https://linkedin.com/in/michaelbrown"
    }
  },
  '5': {
    name: "Sophia Davis",
    graduationYear: 2019,
    degree: "BSc in Data Science",
    currentPosition: "Data Scientist at Amazon",
    location: "Seattle, WA",
    contact: "sophia.davis@gmail.com",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=400&h=400",
    bio: "Data scientist with a focus on machine learning and predictive analytics. Passionate about solving complex business problems with data-driven solutions.",
    additionalInfo: {
      Hobbies: "Hiking, Painting",
      LinkedIn: "https://linkedin.com/in/sophiadavis"
    }
  },
  '6': {
    name: "William Wilson",
    graduationYear: 2015,
    degree: "PhD in Physics",
    currentPosition: "Research Scientist at NASA",
    location: "Houston, TX",
    contact: "will@i.am",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=400&h=400",
    bio: "Research scientist working on space exploration and astrophysics projects at NASA. Specializing in planetary science and space missions.",
    additionalInfo: {
      Hobbies: "Stargazing, Chess",
      LinkedIn: "https://linkedin.com/in/williamwilson"
    }
  },
};



const ViewProfilePage = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const profileData = dummyProfileData[userId];
      setProfile(profileData);
      setLoading(false);
    };
    fetchProfile();
  }, [userId]);

  const handleMessageClick = () => {
    navigate(`/connect?tab=Messaging&userId=${userId}`);
  };

  if (loading) return <p>Loading profile...</p>;

  if (!profile) return <p>No profile found</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-6 mb-6">
          <img
            src={profile.profileImage}
            alt={`${profile.name}'s profile`}
            className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600">{profile.degree} - Class of {profile.graduationYear}</p>
            <p className="text-gray-500">{profile.currentPosition} | {profile.location}</p>
          </div>
        </div>
        <ProfileDetailSection title="Contact Info" details={{ Email: profile.contact }} />
        <ProfileDetailSection title="Bio" details={{ Bio: profile.bio }} />
        <ProfileDetailSection title="Additional Info" details={profile.additionalInfo} />
        <button
          onClick={handleMessageClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Message
        </button>
      </div>
    </div>
  );
};

export default ViewProfilePage;