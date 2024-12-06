import React, { createContext, useState, useContext } from 'react';
const ParticipantAuthContext = createContext();

export const ParticipantAuthProvider = ({ children }) => {
    const [isAuthenticatedP, setIsAuthenticatedP] = useState(!!localStorage.getItem('participantToken'));
    const [participantDetails, setParticipantDetails] = useState(() => {
        try {
            const details = localStorage.getItem('participantDetails');
            return details ? JSON.parse(details) : null;
        } catch (error) {
            console.error('Errore durante il recupero dei dettagli del partecipante:', error);
            return null;
        }
    });
    
    //const [participantDetails, setParticipantDetails] = useState(localStorage.getItem('participantDetails') || null)

    const loginP = (token, participant) => {
        localStorage.setItem('participantToken', token);
        localStorage.setItem('participantDetails', JSON.stringify(participant));
        setIsAuthenticatedP(true);
        setParticipantDetails(participant)
    };

    const logoutP = () => {
        localStorage.removeItem('participantToken');
        localStorage.removeItem('participantDetails');
        setIsAuthenticatedP(false);
        setParticipantDetails(null);
    };

    return (
        <ParticipantAuthContext.Provider value={{ isAuthenticatedP, participantDetails, loginP, logoutP }}>
            {children}
        </ParticipantAuthContext.Provider>
    );
};

export const useParticipantAuth = () => useContext(ParticipantAuthContext);