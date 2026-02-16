
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Layout from './components/Layout';
import { AuthState, User } from './types';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    // Check for existing session in localStorage
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setAuth({
        isAuthenticated: true,
        user: JSON.parse(savedUser),
        token: savedToken,
      });
    }
  }, []);

  const handleLogin = (user: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ isAuthenticated: true, user, token });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ isAuthenticated: false, user: null, token: null });
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={!auth.isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/signup" 
          element={!auth.isAuthenticated ? <Signup onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        
        <Route element={<Layout user={auth.user} onLogout={handleLogout} />}>
          <Route 
            path="/" 
            element={auth.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={auth.isAuthenticated ? <Profile user={auth.user} /> : <Navigate to="/login" />} 
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
