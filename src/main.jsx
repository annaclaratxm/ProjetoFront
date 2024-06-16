import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import CreateUser from './components/CrudUsers/CreateUser.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginComponent from './components/Login/loginComponent.jsx';
import Home from './components/Home/Home.jsx';
import CreateServices from './components/CrudServices/CreateServices.jsx';

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
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
