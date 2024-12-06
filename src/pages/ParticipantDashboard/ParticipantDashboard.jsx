import React,{ useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, Navigate } from "react-router-dom";
import { useParticipantAuth } from "../../context/ParticipantAuthContext"

function ParticipantDashboard() {
    const { isAuthenticatedP, participantDetails, logoutP } = useParticipantAuth()
  return (
    <>
    <Header/>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              {!participantDetails ? (
                <>
                  <p>Dettagli del partecipante non disponibili. Effettua nuovamente l'accesso.</p>;
                </>
              ) : (
                <>
                  <h1>Benvenuto {participantDetails.nome} {participantDetails.cognome}</h1>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    <Footer/>
    </>
  )
}

export default ParticipantDashboard