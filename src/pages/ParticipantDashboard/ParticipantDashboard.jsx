import React,{ useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import { Link, Navigate } from "react-router-dom";
import { useParticipantAuth } from "../../context/ParticipantAuthContext"

function ParticipantDashboard() {
    const { isAuthenticatedP, participantDetails, logoutP } = useParticipantAuth()
  return (
    <div className="container-fluid gx-0">
      <Header/>
      <div className="container">
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
    </div>
  )
}

export default ParticipantDashboard