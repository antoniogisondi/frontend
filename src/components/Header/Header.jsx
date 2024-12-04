import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useParticipantAuth } from '../../context/ParticipantAuthContext'

function Header() {
    const {isAuthenticated, logout} = useAuth()
    const {isAuthenticatedP, logoutP} = useParticipantAuth()
    return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Piattaforma
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                    {isAuthenticated ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                        </li>
                    </>
                    ) : isAuthenticatedP ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/participant-dashboard">Dashboard corsista</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={logoutP}>Logout</button>
                        </li>
                    </>
                    ) : (
                        <p>Accedi o registrati per scoprire i nostri servizi</p>
                    )}
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    )
}

export default Header
