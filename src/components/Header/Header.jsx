import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function Header() {
  const {isAuthenticated, logout} = useContext(AuthContext)
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
                                  <Link className="nav-link" to="/dashboard">
                                      Dashboard
                                  </Link>
                              </li>
                              <li className="nav-item">
                                  <button
                                      className="btn btn-link nav-link"
                                      onClick={logout}
                                  >
                                      Logout
                                  </button>
                              </li>
                          </>
                      ) : (
                          <>
                              <li className="nav-item">
                                  <Link className="nav-link" to="/accesso">
                                      Login
                                  </Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to="/registrazione">
                                      Registrati
                                  </Link>
                              </li>
                          </>
                      )}
                  </ul>
              </div>
          </div>
      </nav>
    </header>
  )
}

export default Header
