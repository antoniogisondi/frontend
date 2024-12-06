import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Homepage.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useParticipantAuth } from '../../context/ParticipantAuthContext'


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

  return (
    <>
        <Header/>
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
            <div className="row">
                <div className="col-md-12">
                  {isAuthenticated ? (
                    <>
                      <h1 className="display-4 mb-4">Benvenuto nella Piattaforma</h1>
                      <p className="lead mb-5">Gestisci i tuoi corsi e i partecipanti in modo semplice ed efficace.</p>
                      <Link to='/dashboard'>Vai alla dashboard</Link>
                      <button className="btn btn-link nav-link" onClick={handleLogout}>
                          Logout
                      </button>
                    </>
                  ) : isAuthenticatedP ? (
                    <>
                      <h1 className="display-4 mb-4">Benvenuto nella Piattaforma</h1>
                      <p className="lead mb-5">Gestisci i tuoi corsi in modo semplice ed efficace.</p>
                      <Link to='/participant-dashboard'>Vai alla dashboard</Link>
                      <button className="btn btn-link nav-link" onClick={handleLogoutP}>
                          Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <h1 className="display-4 mb-4">Benvenuto nella Piattaforma</h1>
                      <p className="lead mb-5">Gestisci i tuoi corsi e i partecipanti in modo semplice ed efficace.</p>
                      <Link to='/accesso' className="btn btn-outline-secondary btn-lg">Vai al login</Link>
                      <Link to='/registrazione' className="btn btn-primary btn-lg">Vai alla registrazione</Link>
                      <Link to='/accesso-corsista' className="btn btn-primary btn-lg">Vai all'accesso corsista</Link>
                    </>
                  )}
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Homepage
