import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    // Verifica se l'utente è autenticato al caricamento dell'app
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (userToken) => {
        setToken(userToken);
        setIsAuthenticated(true);
        localStorage.setItem('token', userToken);
    };

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate('/'); // Reindirizza alla pagina di accesso
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
