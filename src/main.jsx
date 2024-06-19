import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import CreateUser from './components/CrudUsers/CreateUser.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginComponent from './components/Login/loginComponent.jsx';
import Home from './components/Home/Home.jsx';
import CreateServices from './components/CrudServices/CreateServices.jsx';
import CreateOrEditProduct from './components/CrudServices/CreateOrEditServices.jsx';
import CreateOrEditUsers from './components/CrudUsers/CreateOrEditUsers.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginComponent />,
  },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'users',
        element: <CreateUser />,
      },
      {
        path: 'services',
        element: <CreateServices />,
      },
      {
        path: 'services/create',
        element: <CreateOrEditProduct />,
      },
      {
        path: 'services/edit/:id',
        element: <CreateOrEditProduct />, 
      },
      {
        path: 'users/create',
        element: <CreateOrEditUsers/>
      },
      {
        path: 'users/edit/:id',
        element: <CreateOrEditUsers/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
