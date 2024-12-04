import React from 'react';
import { Navigate } from 'react-router-dom';
import { useParticipantAuth } from '../../context/ParticipantAuthContext';

const PrivateParticipantRoute = ({ children }) => {
    const { isAuthenticatedP } = useParticipantAuth();

    if (!isAuthenticatedP) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateParticipantRoute;