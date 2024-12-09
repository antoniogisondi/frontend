import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/');
        return null;
    }

    return (
        <div className="container-fluid gx-0">
            <Header />
            <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 mb-4">Benvenuto nella Dashboard</h1>
                        <p className="lead mb-5">
                            Gestisci i tuoi corsi e i partecipanti in modo semplice ed efficace.
                        </p>
                        <div className="btn-group" role="group" aria-label="Dashboard actions">
                            <Link to="/dashboard/corsi" className="btn btn-primary btn-lg mx-2">
                                <i className="bi bi-journal-text"></i> Vedi i corsi
                            </Link>
                            <Link to="/dashboard/partecipanti" className="btn btn-secondary btn-lg mx-2">
                                <i className="bi bi-people-fill"></i> Vedi i partecipanti
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
