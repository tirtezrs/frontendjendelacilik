// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import 'antd/dist/reset.css';
import './styles/theme.css';
import 'antd/dist/reset.css'; // Untuk versi Ant Design 5
// src/main.jsx
import './styles/layout.css';
import './styles/typography.css';
import './styles/components.css'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
