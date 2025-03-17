import React from 'react';
import { Outlet } from 'react-router-dom';

const ClientComponent = () => {
    return (
        <div>
            <main>
                <Outlet /> 
            </main>
\        </div>
    );
};

export default ClientComponent;
