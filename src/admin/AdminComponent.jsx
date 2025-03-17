import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminComponent = () => {
    return (
        <div>
            <h1>Admin Layout</h1>
            <main>
                <Outlet />  {/* ✅ This is critical for rendering child routes like /admin/dashboard */}
            </main>
        </div>
    );
};

export default AdminComponent;
