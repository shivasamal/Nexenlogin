import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Lazy-loaded components
const AdminDashboard = lazy(() => import('../admin/dashboard/AdminDashboard'));

const AdminRoutingModule = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      <Route path="dashboard" element={<AdminDashboard />} />

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminRoutingModule;
