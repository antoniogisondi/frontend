import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Recupera il token dal localStorage

    // Se il token non esiste, reindirizza alla pagina di login
    if (!token) {
        return <Navigate to="/accesso" />;
    }

    return children; // Altrimenti mostra il contenuto protetto
};

export default PrivateRoute;