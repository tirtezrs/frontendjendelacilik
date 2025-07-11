import React, { createContext, useContext, useState, useEffect } from 'react';

// Buat AuthContext
const AuthContext = createContext();

// Provider-nya
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan user login
  const [loading, setLoading] = useState(true); // Bisa dipakai untuk splash screen

  // Simulasi: ambil user dari localStorage
  // Di src/context/AuthContext.jsx

useEffect(() => {
  // KEMBALIKAN KODE INI SEPERTI SEMULA
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  if (storedUser && storedToken) {
    setUser(JSON.parse(storedUser));
    setToken(storedToken);
  }
  setLoading(false);
}, []);

  // Fungsi login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('jendelacilik_user', JSON.stringify(userData));
  };

  // Fungsi logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('jendelacilik_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook biar gampang pakai
export const useAuth = () => useContext(AuthContext);
