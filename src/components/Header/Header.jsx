import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useParticipantAuth } from '../../context/ParticipantAuthContext';

function Header() {
    const { isAuthenticated, logout } = useAuth();
    const { isAuthenticatedP, logoutP } = useParticipantAuth();

    return (
        <header className="shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    {/* Logo o nome della piattaforma */}
                    <Link className="navbar-brand fw-bold text-primary" to="/"><i className="bi bi-mortarboard"></i> Piattaforma</Link>
                    
                    {/* Bottone per la versione mobile */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {/* Utente autenticato */}
                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
                                    </li>
                                </>
                            ) : isAuthenticatedP ? (
                                /* Corsista autenticato */
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/participant-dashboard">Dashboard corsista</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-outline-danger btn-sm" onClick={logoutP}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                /* Utente non autenticato */
                                <>
                                    <li className="nav-item">
                                        <Link className="btn btn-outline-primary btn-sm me-2" to="/accesso">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-primary btn-sm" to="/registrazione">Registrati</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
