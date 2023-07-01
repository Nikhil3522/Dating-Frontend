import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children}) => {
const isAuthenticated = true;
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default PrivateRoute;
