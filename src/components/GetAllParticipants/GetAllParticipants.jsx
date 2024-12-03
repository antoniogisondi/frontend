import React, {useState, useEffect} from 'react'
import { getAllParticipants, deleteParticipant } from '../../services/courseService'
import { useNavigate, Link, data } from 'react-router-dom'
import './GetAllParticipants.css'

function GetAllParticipants() {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const data = await getAllParticipants();
                setParticipants(data);
                setLoading(false);
            } catch (err) {
                console.error('Errore durante il recupero dei partecipanti:', err);
                setError('Errore durante il recupero dei partecipanti');
                setLoading(false);
            }
        };

        fetchParticipants();
    }, []);

    const handleDelete = async (participantId) => {
        const confirm = window.confirm(
            `Sei sicuro di voler eliminare il partecipante?`
        );

        if (confirm) {
            try {
                await deleteParticipant(participantId);
                alert('Partecipante eliminato con successo');
                setParticipants((prev) => prev.filter((participant) => participant._id !== participantId));      
                navigate('/dashboard/partecipanti')
            } catch (err) {
                console.error('Errore durante l\'eliminazione del partecipante:', err);
                alert('Errore durante l\'eliminazione del partecipante.');
            }
        }
    };

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="container">
            <h1>Gestione Partecipanti</h1>
            {participants.length > 0 ? (
                <div>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Email</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.map((participant) => (
                                <tr key={participant._id}>
                                    <td>{participant.nome}</td>
                                    <td>{participant.cognome}</td>
                                    <td>{participant.email}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary btn-sm me-2"
                                            to={`/dashboard/partecipanti/${participant._id}`}
                                        >
                                            Vai al dettaglio
                                        </Link>
                                        <Link
                                            className="btn btn-warning btn-sm me-2"
                                            to={`/dashboard/partecipanti/${participant._id}/modifica`}
                                        >
                                            Modifica
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(participant._id)}
                                        >
                                            Elimina
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center mt-4">Nessun partecipante disponibile</p>
            )}
        </div>

        
    );
}

export default GetAllParticipants