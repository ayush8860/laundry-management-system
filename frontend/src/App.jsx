// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from '@/pages/Dashboard';
import SubmitRequest from '@/pages/SubmitRequest';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Always show Login page on root route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/submit" element={token ? <SubmitRequest /> : <Navigate to="/" />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
