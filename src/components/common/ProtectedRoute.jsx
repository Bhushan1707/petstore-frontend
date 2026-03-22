import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

import Loader from '../common/Loader';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, role, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // If we have a token but haven't fetched the user profile yet, wait.
  if (isAuthenticated && !user) {
    return <Loader />;
  }

  if (adminOnly && role !== 'admin') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default ProtectedRoute;
