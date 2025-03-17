import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientComponent from './ClientComponent';

// Lazy-loaded components
const Dashboard = lazy(() => import('../client/client-dashboard/Dashboard'));
const Signup = lazy(() => import('../client/client-signup/Signup'));
const TaxInfo = lazy(() => import('../client/Tax-info/TaxInfo'));
const UploadDoc = lazy(() => import('../client/UploadDoc/UploadDoc'));
const TrFinal = lazy(() => import('../client/TaxReturn-final/TrFinal'));
const Trdraft = lazy(() => import('../client/TaxReturn-draft/Trdraft'));

const ClientRoutingModule = () => {
  return (
    <Routes>

      <Route path="/" element={<ClientComponent />}>
        <Route index element={<Navigate to="/client/dashboard" replace />} />  
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="signup" element={<Signup />} />
        <Route path="tax-info" element={<TaxInfo />} />
        <Route path="upload-doc" element={<UploadDoc />} />
        <Route path="tax-return-final" element={<TrFinal />} />
        <Route path="tax-return-draft" element={<Trdraft />} />

        {/* {/ 404 Route /}
        <Route path="*" element={<Navigate to="/client/login" replace />} /> */}
      </Route>
    </Routes>
  );
};

export default ClientRoutingModule;
