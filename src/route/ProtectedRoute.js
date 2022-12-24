import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({
    isAdmin,
    children,
    redirect = "/login",
  }) => {

    const { isAuthenticated, user} = useSelector((state) => state.user);

    if (!isAuthenticated) {
      return <Navigate to={redirect} />;
    }
  
    if (isAdmin === true && user.role !=="admin") {
      return <Navigate to={redirect} />;
    }
  
    return children ? children : <Outlet />;
  };

export default ProtectedRoute
