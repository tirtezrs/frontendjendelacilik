// src/router/index.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/shared/Login';
import Register from '../pages/shared/Register';
import About from '../pages/shared/About';
import NotFound from '../pages/shared/NotFound';

import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';

import Dashboard from '../pages/admin/Dashboard';
import ManageVideos from '../pages/admin/ManageVideos';
import ManageBooks from '../pages/admin/ManageBooks';
import Comments from '../pages/admin/Comments';
import Settings from '../pages/admin/Settings';
import ProfileAdmin from '../pages/admin/ProfileAdmin';

import Home from '../pages/user/Home';
import Playlist from '../pages/user/Playlist';
import Books from '../pages/user/Books';
import UserLayout from '../layouts/UserLayout';
import Profile from '../pages/user/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Shared */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/admin/videos" element={<AdminRoute><ManageVideos /></AdminRoute>} />
      <Route path="/admin/books" element={<AdminRoute><ManageBooks /></AdminRoute>} />
      <Route path="/admin/comments" element={<AdminRoute><Comments /></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />
      <Route path="/admin/profile" element={<AdminRoute><ProfileAdmin /></AdminRoute>} />

      {/* User */}
      <Route path="/user/home" element={<UserRoute><Home /></UserRoute>} />
      <Route path="/user/playlist" element={<UserRoute><Playlist /></UserRoute>} />
      <Route path="/user/books" element={<UserRoute><Books /></UserRoute>} />
      <Route path="/user/profile" element={<UserRoute><Profile /></UserRoute>} />
      

      {/* Not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
