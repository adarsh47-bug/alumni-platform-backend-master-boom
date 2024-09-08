// src/pages/CoursesPage.js
import React, { useState, useRef, useEffect } from 'react';
import Wrapper from '../components/Wrapper';

const CourseCard = ({ course, onPurchase }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
    <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
    <div className="p-4 flex-grow">
      <h3 className="text-xl font-semibold text-blue-700">{course.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
      <div className="flex items-center mt-4">
        <span className="text-yellow-500">{'★'.repeat(course.rating)}</span>
        <span className="text-gray-500 ml-2">({course.rating})</span>
      </div>
      <p className="text-gray-500 mt-2">{course.purchases} people have purchased this course</p>
    </div>
    <div className="p-4 bg-gray-50 flex justify-between items-center">
      <button
        onClick={onPurchase}
        className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-700"
      >
        Purchase
      </button>
    </div>
  </div>
);

const navigation = [
  { name: 'All Courses' },
  { name: 'My Courses' },
  { name: 'Web Development Courses' },
  { name: 'Data Science Courses' },
  { name: 'Mobile App Development Courses' },
  { name: 'Artificial Intelligence Courses' },
  { name: 'Cloud Computing Courses' },
  { name: 'Cybersecurity Courses' },
  { name: 'Digital Marketing Courses' },
  { name: 'Graphic Design Courses' },
  { name: 'Project Management Courses' },
  { name: 'Business Analytics Courses' }
];

const Sidebar = ({ navigation, activeCategory, onCategoryClick }) => (
  <div className="w-[20%] h-screen border-r bg-white">
    <div className="px-4 py-6">
      <ul className="space-y-1">
        {navigation.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => onCategoryClick(item.name)}
              className={`block w-full text-left rounded-lg px-4 py-2 text-sm font-medium ${activeCategory === item.name
                ? 'bg-gray-100 text-blue-700'
                : 'text-gray-500 hover:bg-gray-100 hover:text-blue-700'
                }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const CoursesData = [
  {
    title: 'React for Beginners',
    description: 'Learn the basics of React and build your first web application.',
    imageUrl: 'https://lh7-us.googleusercontent.com/D6BrXu23nOJepuMbM-ZSNza1nfl8qLh1PtaGzyYUebo6llBebhDTSKODso4N6JZsFMXuwxSRga2pIqidn6rPkjHJTNd7opp-5HYY87OOFXqiC0nGCcHHenuytpXoG5u4jHzD4MVPdfgW0QvUijKh5q8',
    rating: 4,
    purchases: 120,
    category: 'Web Development Courses',
    isPurchased: false,
  },
  {
    title: 'Data Science with Python',
    description: 'An in-depth course on data science using Python.',
    imageUrl: 'https://gamakaai.com/wp-content/uploads/2020/07/DS-With-Python-Banner.jpg',
    rating: 5,
    purchases: 200,
    category: 'Data Science Courses',
    isPurchased: false,
  },
  {
    title: 'Mobile App Development with Flutter',
    description: 'Build beautiful mobile applications using Flutter.',
    imageUrl: 'https://cdn.prod.website-files.com/5f841209f4e71b2d70034471/6078b650748b8558d46ffb7f_Flutter%20app%20development.png',
    rating: 4,
    purchases: 80,
    category: 'Mobile App Development Courses',
    isPurchased: false,
  },
];

const CoursesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [courses, setCourses] = useState(CoursesData);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handlePurchase = (index) => {
    const updatedCourses = [...courses];
    updatedCourses[index].isPurchased = true;
    updatedCourses[index].purchases += 1;
    setCourses(updatedCourses);
  };

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

  const AddCourseForm = () => (
    <form className="p-6 mb-6 overflow-y-scroll h-[75vh]">
      {['title', 'description', 'imageUrl'].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text"
            id={field}
            name={field}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {navigation.slice(2).map((item, index) => (
            <option key={index} value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Publish Course
      </button>
    </form>
  );

  const filteredCourses = activeCategory === 'All Courses'
    ? courses
    : activeCategory === 'My Courses'
      ? courses.filter(course => course.isPurchased)
      : courses.filter(course => course.category === activeCategory);

  return (
    <Wrapper>
      <div className="flex w-[100vw]">
        <Sidebar navigation={navigation} activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
        <div className="w-[80%] p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-800">{activeCategory}</h1>
            <button
              onClick={togglePopup}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Publish Course
            </button>
          </div>

          {isPopupVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-lg relative w-[50%] scale-[90%]">
                <div className='px-6'>
                  <h2 className="text-xl font-bold mb-4">Publish New Course</h2>
                  <button
                    className="absolute top-2 right-2 border border-gray-500 rounded-lg px-2 py-1 mb-2 hover:bg-red-500"
                    onClick={togglePopup}
                  >
                    Close
                  </button>
                </div>
                <AddCourseForm />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <div className="h-full" key={index}>
                <CourseCard
                  course={course}
                  onPurchase={() => handlePurchase(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CoursesPage;