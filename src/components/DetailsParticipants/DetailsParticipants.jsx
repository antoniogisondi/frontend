import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getParticipantsById } from '../../services/courseService'
import './DetailsParticipants.css'

function DetailsParticipants() {
    const {id} = useParams()
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipant = async () => {
            try {
                const data = await getParticipantsById(id);
                setParticipant(data);
                setLoading(false);
            } catch (err) {
                console.error('Errore durante il recupero del partecipante:', err);
                setError('Errore durante il recupero del partecipante.');
                setLoading(false);
            }
        };

        fetchParticipant();
    }, [id]);
    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="container mt-4">
            <h1>Dettagli Partecipante</h1>
            {participant && (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            {participant.nome} {participant.cognome}
                        </h5>
                        <p className="card-text">
                            <strong>Email:</strong> {participant.email || 'Non specificata'}
                        </p>
                        <p className="card-text">
                            <strong>Data di Nascita:</strong> {new Date(participant.data_nascita).toLocaleDateString()}
                        </p>
                        <p className="card-text">
                            <strong>Comune di Nascita:</strong> {participant.comune_nascita}, {participant.provincia_comune_nascita}
                        </p>
                        <p className="card-text">
                            <strong>Mansione:</strong> {participant.mansione || 'Non specificata'}
                        </p>
                        <p className="card-text">
                            <strong>Azienda:</strong> {participant.azienda || 'Non specificata'}
                        </p>
                        <p className="card-text">
                            <strong>P. IVA:</strong> {participant.partita_iva_azienda || 'Non specificata'}
                        </p>
                        <p className="card-text">
                            <strong>Codice Fiscale:</strong> {participant.codice_fiscale || 'Non specificato'}
                        </p>
                        <h2>Corsi Associati</h2>
                        {participant.courseId.length > 0 ? (
                            <ul>
                                {participant.courseId.map((course) => (
                                    <li key={course._id}>
                                        <strong>{course.nome_corso}</strong>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nessun corso associato</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailsParticipants