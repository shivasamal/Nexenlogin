import React, { Suspense } from 'react';
import ClientRoutingModule from './ClientRoutingModule';

const ClientModule = () => {
    return (
        <Suspense fallback={<div>Loading Client Module...</div>}>
            <ClientRoutingModule />
        </Suspense>
    );
};

export default ClientModule;
