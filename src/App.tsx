import React from 'react';
import { RouterProvider } from 'react-router-dom';
import history from './history';

const App = () => <RouterProvider router={history} />;

export default App;
