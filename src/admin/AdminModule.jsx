import React, { Suspense } from 'react';
import AdminRoutingModule from './AdminRoutingModule';

const AdminModule = () => {
    return (
        <Suspense fallback={<div>Loading Admin Module...</div>}>
            <AdminRoutingModule />
        </Suspense>
    );
};
export default AdminModule;
