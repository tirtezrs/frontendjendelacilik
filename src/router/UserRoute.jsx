import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserLayout from '../layouts/UserLayout';

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // Kalau belum login atau bukan user biasa
  if (!user || user.role !== 'user') {
    return <Navigate to="/" />;
  }

  return <UserLayout>{children}</UserLayout>;
};

export default UserRoute;
