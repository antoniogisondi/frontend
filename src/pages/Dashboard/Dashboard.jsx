import React,{ useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
    const {isAuthenticated} = useContext(AuthContext)
    return (
        <>
        <Header/>
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
            <div className="row">
                <div className="col-md-12">
                    {isAuthenticated ? (
                    <>
                        <h1 className="display-4 mb-4">Benvenuto nella Dashboard</h1>
                        <p className="lead mb-5">Gestisci i tuoi corsi e i partecipanti in modo semplice ed efficace.</p>
                        <Link to='/dashboard/corsi'>Vedi i corsi</Link>
                    </>
                    ) : (
                        Navigate('/')
                    )}
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
    }

export default Dashboard