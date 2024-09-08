// src/components/HeaderCopy.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import axios from 'axios';
// import { AuthContext } from '../context/authContext';

// const navigation = [
//   { name: 'Home', href: '/home' },
//   { name: 'Connect', href: '/connect' },
//   { name: 'Events', href: '/events' },
//   { name: 'University', href: '/university' },
//   { name: 'Courses', href: '/courses' },
//   { name: 'Jobs', href: '/jobs' },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

const Header = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { setUser } = useContext(AuthContext);
  // const [activeTab, setActiveTab] = useState(location.pathname);

  // const handleLogout = async () => {
  //   try {
  //     await axios.post('/api/users/logout');
  //     localStorage.removeItem('userInfo');
  //     localStorage.removeItem('token');
  //     setUser(null);
  //     navigate('/login');
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // };

  // const handleTabClick = (href) => {
  //   setActiveTab(href);
  // };

  return (
    <Disclosure as="nav" className="bg-[#350c35ef] fixed w-[100vw] shadow-lg z-10 top-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/home" className="text-2xl font-bold text-white">
              AlumNet Rajasthan
            </Link>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 max-md:hidden">
            <Link to="/login" className="bg-white p-2 mx-2 rounded-md  text-black hover:text-blue focus:outline-none focus:ring-2">
              Sign In
            </Link>
            <Link to="/register" className="flex rounded-md p-3 mx-2 font-bold bg-black text-sm focus:outline-none focus:ring-2 text-white">
              Register
            </Link>
          </div>
        </div>
      </div>


    </Disclosure>
  );
};

export default Header;