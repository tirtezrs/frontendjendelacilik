import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../layouts/AdminLayout';
import { Spin } from 'antd';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Jika context masih loading data dari localStorage, tampilkan spinner
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  // Jika loading selesai dan user tidak ada, atau rolenya bukan admin
  if (!user || user.role !== 'admin') {
    // Redirect ke halaman login, dan simpan halaman tujuan mereka
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika lolos semua, tampilkan halaman yang dituju di dalam AdminLayout
  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminRoute;