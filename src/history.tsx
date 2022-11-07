import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Auth from './hocs/Auth';
import Home from './pages/Home';
import Login from './pages/Login';

const history = createBrowserRouter([
    {
        path: '/home',
        element: (
            <Auth>
                <Home />
            </Auth>
        ),
    },
    {
        path: '/',
        element: <Login />,
    },
]);

export default history;