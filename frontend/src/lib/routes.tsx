import * as React from "react";
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Board from '../pages/Board';
import Register from '../pages/Register';
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../pages/NotFound";

type RouteType = {
    path: string;
    element: React.ReactNode;
};

const routes: RouteType[] = [
    {
        path: '/',
        element: <Navigate replace to="/login" />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/board',
        element: (
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;
