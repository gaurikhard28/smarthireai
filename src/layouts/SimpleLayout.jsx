import React from 'react';
import { Outlet } from 'react-router-dom';

const SimpleLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default SimpleLayout;