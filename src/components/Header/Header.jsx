import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useParticipantAuth } from '../../context/ParticipantAuthContext';
import logo from '/img/Logo MGL Consulting.jpg'

function Header() {
    const { isAuthenticated, logout } = useAuth();
    const { isAuthenticatedP, logoutP } = useParticipantAuth();

    return (
        <header className="custom-header shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    {/* Logo o nome della piattaforma */}
                    <Link className="navbar-brand custom-brand" to="/">
                        <i className="bi bi-mortarboard"></i> Piattaforma
                    </Link>

                    {/* Bottone per la versione mobile */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto custom-navbar">
                            {/* Utente autenticato */}
                            {isAuthenticated || isAuthenticatedP ? (
                                <li className="nav-item dropdown custom-dropdown">
                                    <a
                                        className="nav-link dropdown-toggle custom-dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-person-circle me-1"></i> Account
                                    </a>
                                    <ul
                                        className="dropdown-menu custom-dropdown-menu dropdown-menu-end"
                                        aria-labelledby="navbarDropdown"
                                    >
                                        {isAuthenticated && (
                                            <>
                                                <li>
                                                    <Link className="dropdown-item custom-dropdown-item" to="/dashboard">
                                                        <i className="bi bi-speedometer2 me-2"></i> Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item custom-dropdown-item text-danger"
                                                        onClick={logout}
                                                    >
                                                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                                                    </button>
                                                </li>
                                            </>
                                        )}
                                        {isAuthenticatedP && (
                                            <>
                                                <li>
                                                    <Link
                                                        className="dropdown-item custom-dropdown-item"
                                                        to="/participant-dashboard"
                                                    >
                                                        <i className="bi bi-person-circle me-2"></i> Dashboard corsista
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item custom-dropdown-item text-danger"
                                                        onClick={logoutP}
                                                    >
                                                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                                                    </button>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </li>
                            ) : (
                                /* Utente non autenticato */
                                <>
                                    <li className="nav-item">
                                        <Link className="btn custom-btn-outline-primary me-2" to="/accesso">
                                            <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn custom-btn-primary" to="/registrazione">
                                            <i className="bi bi-person-plus me-1"></i> Registrati
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg">
                <div className="container bg-white sub-container p-0">
                    <div className="row">
                    {isAuthenticated ? (
                        <div className="col">
                            <Link className='btn btn custom-subheader' to='/'>
                                Home
                            </Link>
                            <Link className='btn btn custom-subheader' to='/dashboard/corsi'>
                                Corsi in aula
                            </Link>
                            <Link className='btn btn custom-subheader' to='/dashboard/partecipanti'>
                                Visualizza i corsisti
                            </Link>
                        </div>
                    ) : isAuthenticatedP ? (
                        <div className='col'>
                            <Link className='btn btn custom-subheader' to='/'>
                                Home
                            </Link>
                            <Link className='btn btn custom-subheader' to='/participant-dashboard/corsi'>
                                Visualizza i corsi che hai effettuato
                            </Link>
                        </div>
                    ) : (
                        <div className='col'>
                            <Link className='btn btn custom-subheader' to='/'>
                                Home
                            </Link>
                            <Link className='btn btn custom-subheader' to='/dashboard/partecipanti'>
                                Visualizza i corsisti
                            </Link>
                            <Link className='btn btn custom-subheader'>
                                Corsi in aula
                            </Link>
                        </div>
                    )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
