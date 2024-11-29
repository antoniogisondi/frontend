import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // Mostra un loader mentre verifica l'autenticazione
    if (loading) {
        return <p>Caricamento...</p>;
    }

    // Se non autenticato, reindirizza alla pagina di login
    if (!isAuthenticated) {
        return <Navigate to="/accesso" />;
    }

    return children;
};

export default PrivateRoute;