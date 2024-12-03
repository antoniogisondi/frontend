import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getParticipantsById, updateParticipants } from '../../services/courseService'
import './UpdateParticipants.css'

function UpdateParticipants() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [participantData, setParticipantData] = useState({
        nome: '',
        cognome: '',
        email: '',
        data_nascita: '',
        comune_nascita: '',
        provincia_comune_nascita: '',
        mansione: '',
        azienda: '',
        partita_iva_azienda: '',
        codice_fiscale: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recupera i dettagli del partecipante all'inizio
    useEffect(() => {
        const fetchParticipant = async () => {
            try {
                const data = await getParticipantsById(id);
                setParticipantData({
                    ...data,
                    data_nascita: data.data_nascita ? data.data_nascita.split('T')[0] : '', // Formatta la data
                });
                setLoading(false);
            } catch (err) {
                console.error('Errore durante il recupero del partecipante:', err);
                setError('Errore durante il recupero dei dati.');
                setLoading(false);
            }
        };

        fetchParticipant();
    }, [id]);

    // Gestisce i cambiamenti degli input
    const handleChange = (e) => {
        setParticipantData({
            ...participantData,
            [e.target.name]: e.target.value,
        });
    };

    // Gestisce l'invio del modulo
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateParticipants(id, participantData);
            alert('Partecipante aggiornato con successo!');
            navigate(`/dashboard/partecipanti/${id}`); // Torna alla pagina del dettaglio
        } catch (err) {
            console.error('Errore durante l\'aggiornamento del partecipante:', err);
            alert('Errore durante l\'aggiornamento del partecipante.');
        }
    };

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h1>Modifica Partecipante</h1>

            <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={participantData.nome}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Cognome</label>
                <input
                    type="text"
                    className="form-control"
                    name="cognome"
                    value={participantData.cognome}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={participantData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Data di Nascita</label>
                <input
                    type="date"
                    className="form-control"
                    name="data_nascita"
                    value={participantData.data_nascita}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Comune di Nascita</label>
                <input
                    type="text"
                    className="form-control"
                    name="comune_nascita"
                    value={participantData.comune_nascita}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Provincia Comune di Nascita</label>
                <input
                    type="text"
                    className="form-control"
                    name="provincia_comune_nascita"
                    value={participantData.provincia_comune_nascita}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Mansione</label>
                <input
                    type="text"
                    className="form-control"
                    name="mansione"
                    value={participantData.mansione}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Azienda</label>
                <input
                    type="text"
                    className="form-control"
                    name="azienda"
                    value={participantData.azienda}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Partita IVA Azienda</label>
                <input
                    type="text"
                    className="form-control"
                    name="partita_iva_azienda"
                    value={participantData.partita_iva_azienda}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Codice Fiscale</label>
                <input
                    type="text"
                    className="form-control"
                    name="codice_fiscale"
                    value={participantData.codice_fiscale}
                    onChange={handleChange}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Salva Modifiche
            </button>
        </form>
    )
}

export default UpdateParticipants