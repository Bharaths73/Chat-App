import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { token, userData } = useSelector((state) => state.auth);

  // Check if token exists (user is authenticated)
  if (!token) {
    return <Navigate to="/" />;
  }

  // // Check if profile setup is incomplete
  // if (userData && !userData.profileSetup && window.location.pathname !== '/profile') {
  //   return <Navigate to="/profile" />;
  // }

  // User is authenticated and profile is set up
  return children;
}

export default PrivateRoute;
