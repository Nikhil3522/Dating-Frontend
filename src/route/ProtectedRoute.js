import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import localforage from 'localforage';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    try {
      const data = await localStorage.getItem('userLogin');
      if (data && data.value) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Error fetching user login data:', error);
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default PrivateRoute;
