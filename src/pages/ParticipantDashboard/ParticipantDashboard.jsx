import React,{ useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, Navigate } from "react-router-dom";
import { useParticipantAuth } from "../../context/ParticipantAuthContext"

function ParticipantDashboard() {
    const {isAuthenticated,participantToken,logout } = useParticipantAuth()
  return (
    <>
    <Header/>
    <Footer/>
    </>
  )
}

export default ParticipantDashboard