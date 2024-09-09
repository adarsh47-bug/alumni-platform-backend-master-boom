// frontend/src/components/CombinedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Header from './Header';
import HeaderCopy from './HeaderCopy';

const CombinedRoute = ({ element: Component, isPrivate, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div aria-label="Loading..." role="status" className="flex justify-center items-center space-x-2 w-[100vw] h-[100vh]">
        <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
          <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
          <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
        </svg>
        <span className="text-4xl font-medium text-gray-500">Loading...</span>
      </div>
    ); // You can replace this with a spinner or loading component
  }

  if (isPrivate) {
    return (
      <>
        <Header />
        {user ? <Component {...rest} /> : <Navigate to="/login" />}
      </>

    );
  } else {
    return (
      <>
        <HeaderCopy />
        {user ? <Navigate to="/home" /> : <Component {...rest} />}
      </>

    );
  }
};

export default CombinedRoute;