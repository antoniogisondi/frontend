import React,{ useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

function Dashboard() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const { data } = await API.get('/private');
                setMessage(data.message);
            } catch (err) {
                console.error('Errore durante il recupero dei dati:', err);
            }
        };

        fetchMessage();
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{message}</p>
            <Link to='/dashboard/corsi'>Vedi i corsi</Link>
        </div>
    )
    }

export default Dashboard