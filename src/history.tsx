import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from './components/NotFound';
import Auth from './hocs/Auth';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
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
    path: '/favorites',
    element: (
      <Auth>
        <Favorites />
      </Auth>
    ),
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/details/:movieId',
    element: (
      <Auth>
        <Details />
      </Auth>
    ),
  },
]);

export default history;
