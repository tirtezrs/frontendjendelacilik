import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppRoutes from './router';

const App = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';
      if (isAuthPage) {
        const targetPath = user.role === 'admin' ? '/admin/dashboard' : '/user/home';
        navigate(targetPath, { replace: true });
      }
    }
  }, [user, navigate, location]);

  return <AppRoutes />;
};

export default App;