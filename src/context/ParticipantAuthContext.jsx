import React, { createContext, useState, useContext } from 'react';
const ParticipantAuthContext = createContext();

export const ParticipantAuthProvider = ({ children }) => {
    const [isAuthenticatedP, setIsAuthenticatedP] = useState(!!localStorage.getItem('participantToken'));

    const loginP = (token) => {
        localStorage.setItem('participantToken', token);
        setIsAuthenticatedP(true);
    };

    const logoutP = () => {
        localStorage.removeItem('participantToken');
        setIsAuthenticatedP(false);
    };

    return (
        <ParticipantAuthContext.Provider value={{ isAuthenticatedP, loginP, logoutP }}>
            {children}
        </ParticipantAuthContext.Provider>
    );
};

export const useParticipantAuth = () => useContext(ParticipantAuthContext);