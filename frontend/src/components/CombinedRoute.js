// frontend/src/components/CombinedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const CombinedRoute = ({ element: Component, isPrivate, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading component
  }

  if (isPrivate) {
    return user ? <Component {...rest} /> : <Navigate to="/login" />;
  } else {
    return user ? <Navigate to="/home" /> : <Component {...rest} />;
  }
};

export default CombinedRoute;