import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Homepage.css'
import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <>
        <Header/>
        <div>
          <Link to='/accesso'>Vai al login</Link>
          <Link to='/registrazione'>Vai alla registrazione</Link>
        </div>
        <Footer/>
    </>
  )
}

export default Homepage
