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
      const data = await localforage.getItem('userLogin');
      console.log("data value", data);
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

  if(children.props.reqAuth === false){
    if(isAuthenticated && (children.props.url === '/login' || children.props.url === '/' || children.props.url === '/signup')){
      return <Navigate to='/home' />;
    }else{
      return children;
    }
  }

  // if(isAuthenticated && children.props.url === '/home'){
  //   return children;
  // }

  // if(isAuthenticated && (children.props.url === "/" || children.props.url === "/login" || children.props.url === "/signup" || children.props.url === "/forget-password")){
  //   console.log("isAuth 1")
  //   return <Navigate to='/home' />
  // }

  // if(!isAuthenticated && (children.props.url === "/" || children.props.url === "/login" || children.props.url === "/signup" || children.props.url === "/forget-password")){
  //   console.log("isAuth 2")
  //   return children;
  // }

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default PrivateRoute;
