import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ClientRoutingModule from "./client/ClientRoutingModule";
import ClientLoginPage from "./client/client-login/ClientLoginPage"; // Assuming this is your login component
import AdminRoutingModule from "./admin/AdminRoutingModule";
import AdminLoginPage from "./admin/admin-login/AdminLoginPage";

function App() {
  const [isClientAuthenticated, setIsClientAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    !!localStorage.getItem("adminAuthToken")
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsClientAuthenticated(!!localStorage.getItem("authToken"));
      setIsAdminAuthenticated(!!localStorage.getItem("adminAuthToken"));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/client/login" replace />} />

        <Route path="/client/login" element={<ClientLoginPage />} />

        <Route
          path="/client/*"
          element={
            isClientAuthenticated ? (
              <ClientRoutingModule />
            ) : (
              <Navigate to="/client/login" replace />
            )
          }
        />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/*"
          element={
            isAdminAuthenticated ? (
              <AdminRoutingModule />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        {/* {/ Catch-All for 404 /}
                <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
