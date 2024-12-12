import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Loader from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useParticipantAuth } from '../../context/ParticipantAuthContext'
import './Homepage.css'


function Homepage() {
  const { isAuthenticated, logout} = useAuth()
  const { isAuthenticatedP, logoutP} = useParticipantAuth()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  const handleLogoutP = async () => {
    setLoading(true);
    await logoutP();
    setLoading(false);
  };

  if (loading) return <div className='container-fluid gx-0'><Loader/></div>

  return (
    <div className="container-fluid gx-0">
      <Header />
      <div className="container homepage-container mt-5">
        <div className="row text-center">
          <div className="col">
            <h1 className="display-4">Benvenuto nella Piattaforma</h1>
            <p className="lead mb-4">
                Gestisci i tuoi corsi e i partecipanti in modo semplice ed efficace.
            </p>
            {isAuthenticated ? (
              <>
              <Link to="/dashboard" className="btn btn-primary me-2">Vai alla Dashboard</Link>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
              </>
            ) : isAuthenticatedP ? (
              <>
              <Link to="/participant-dashboard" className="btn btn-primary me-2">Vai alla Dashboard Corsista</Link>
              <button className="btn btn-danger" onClick={handleLogoutP}>Logout</button>
              </>
            ) : (
              <>
              <Link to="/accesso" className="btn btn-outline-secondary me-2">Login</Link>
              <Link to="/registrazione" className="btn btn-primary me-2">Registrazione</Link>
              <Link to="/accesso-corsista" className="btn btn-primary">Accesso Corsista</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
