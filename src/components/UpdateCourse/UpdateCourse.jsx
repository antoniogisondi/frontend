import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader'
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseDetails, updateCourse, getAllParticipants } from '../../services/courseService';
import courses from '../../services/courses'
import './UpdateCourse.css';

function UpdateCourse() {
    // Recupero i paramentri nell'url
    const { id } = useParams();
    const navigate = useNavigate();

    // Inizializzo gli stati degli input
    const [courseData, setCourseData] = useState({
        nome_corso: '',
        indirizzo_di_svolgimento: '',
        cap_sede_corso: '',
        città_di_svolgimento: '',
        provincia: '',
        direttore_corso: '',
        docente_corso: '',
        categoria_corso: '',
        durata_corso: [],
        programma_corso: [],
        partecipanti: []
    });
    const [selectedCourse, setSelectedCourse] = useState('');
    const [participants, setParticipants] = useState([]); 
    const [selectedParticipant, setSelectedParticipant] = useState('');
    const [newParticipant, setNewParticipant] = useState({
        nome: '',
        cognome: '',
        codice_fiscale: '',
        email: '',
        data_nascita: '',
        comune_nascita: '',
        provincia_comune_nascita: '',
        mansione: '',
        azienda: '',
        partita_iva_azienda: '',
    });
    const [durationDay, setDurationDay] = useState({ giorno: '', durata_ore: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recupera i dettagli del corso e li renderizzo
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourseDetails(id);
                setCourseData(data.course);
                setSelectedCourse(data.course.nome_corso)
                const participantsList = await getAllParticipants();
                setParticipants(participantsList);
                setLoading(false);
            } catch (error) {
                console.error('Errore durante il recupero del corso:', error);
                setError('Errore durante il recupero del corso.');
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleCourseSelect = (e) => {
        const selected = courses.find((course) => course.nome_corso === e.target.value);
        setSelectedCourse(selected.nome_corso);
        setCourseData((prev) => ({
            ...prev,
            nome_corso: selected.nome_corso,
            programma_corso: selected.programma_corso,
        }));
    };

    // Gestisce i cambiamenti negli input generici
    const handleChange = (e) => {
        setCourseData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const addNewParticipant = () => {
        if (
            !newParticipant.nome ||
            !newParticipant.cognome ||
            !newParticipant.codice_fiscale ||
            !newParticipant.data_nascita ||
            !newParticipant.comune_nascita ||
            !newParticipant.provincia_comune_nascita
        ) {
            alert('Compila tutti i campi del partecipante.');
            return;
        }

        setCourseData((prev) => ({
            ...prev,
            partecipanti: [...prev.partecipanti, newParticipant],
        }));

        setNewParticipant({
            nome: '',
            cognome: '',
            codice_fiscale: '',
            email: '',
            data_nascita: '',
            comune_nascita: '',
            provincia_comune_nascita: '',
            mansione: '',
            azienda: '',
            partita_iva_azienda: '',
        });
    };

    // Funzione per rimuovere i partecipanti
    const removeParticipant = (index) => {
        setCourseData((prev) => ({
            ...prev,
            partecipanti: prev.partecipanti.filter((_, i) => i !== index),
        }));
    };

    // Funzione per aggiungere un partecipante esistente 
    const addExistingParticipant = () => {
        if (!selectedParticipant) {
            alert('Seleziona un partecipante da aggiungere.');
            return;
        }

        const participantToAdd = participants.find((p) => p._id === selectedParticipant);

        if (!participantToAdd) {
            alert('Partecipante non valido.');
            return;
        }

        setCourseData((prev) => ({
            ...prev,
            partecipanti: [...prev.partecipanti, participantToAdd],
        }));

        setSelectedParticipant('');
    };

    // Aggiunge un giorno alla durata del corso
    const addDurationDay = () => {
        if (!durationDay.giorno || !durationDay.durata_ore) {
            alert('Compila sia il giorno che la durata in ore.');
            return;
        }

        const today = new Date().setHours(0,0,0,0)
        const selectedDate = new Date(durationDay.giorno).setHours(0,0,0,0)

        if (selectedDate <= today) {
            alert('La data selezionata deve essere maggiore della data odierna')
            return
        }

        setCourseData((prev) => ({
            ...prev,
            durata_corso: [...prev.durata_corso, durationDay],
        }));

        setDurationDay({ giorno: '', durata_ore: '' });
    };

    // Gestisce l'invio del modulo
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (courseData.partecipanti.length === 0) {
            alert('Devi aggiungere almeno un partecipante.');
            return;
        }

        if (courseData.durata_corso.length === 0) {
            alert('Devi aggiungere almeno una durata per il corso.');
            return;
        }

        try {
            const preparedData = {
                ...courseData,
                partecipanti: courseData.partecipanti.map((p) => {
                    if (p._id) {
                        return {_id:p._id}
                    }

                    return p
                })}

            await updateCourse(id, preparedData);
            alert('Corso aggiornato con successo!');
            navigate(`/dashboard/corsi/${id}`);
        } catch (err) {
            console.error('Errore durante la modifica del corso:', err);
            alert('Errore durante la modifica del corso.');
        }
    };

    // Caricamento o errore
    if (loading) return <div><Loader/></div>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            {/* Input dei corsi */}
            <label>Nome del Corso:
                <select value={selectedCourse} onChange={handleCourseSelect} required>
                    <option value="">Seleziona un corso</option>
                    {courses.map((course, index) => (
                    <option key={index} value={course.nome_corso}>{course.nome_corso}</option>
                    ))}
                </select>
            </label>
            <input type="text" name="indirizzo_di_svolgimento" placeholder="Indirizzo di svolgimento" value={courseData.indirizzo_di_svolgimento} onChange={handleChange} required/>
            <input type="number" name="cap_sede_corso" placeholder="CAP sede corso" value={courseData.cap_sede_corso} onChange={handleChange} required/>
            <input type="text" name="città_di_svolgimento" placeholder="Città di svolgimento" value={courseData.città_di_svolgimento} onChange={handleChange} required/>
            <input type="text" name="provincia" placeholder="Provincia" value={courseData.provincia} onChange={handleChange} required/>
            <input type="text" name="direttore_corso" placeholder="Direttore del corso" value={courseData.direttore_corso} onChange={handleChange} required/>
            <input type="text" name="docente_corso" placeholder="Docente del corso"  value={courseData.docente_corso} onChange={handleChange} required/>
            <input type="text" name="categoria_corso" placeholder="Categoria del corso" value={courseData.categoria_corso} onChange={handleChange} required/>

            {/* Input dei partecipanti */}
            <h3>Partecipanti</h3>
            <ul>
                {courseData.partecipanti.map((p, index) => (
                    <li key={index}>
                        {p.nome} {p.cognome} - {p.codice_fiscale}
                        <button type="button" onClick={() => removeParticipant(index)}>Rimuovi</button>
                    </li>
                ))}
            </ul>
            <select value={selectedParticipant} onChange={(e) => setSelectedParticipant(e.target.value)}>
                <option value="">Seleziona un partecipante</option>
                {participants.map((p) => (
                    <option key={p._id} value={p._id}>{p.nome} {p.cognome}</option>
                ))}
            </select>
            <button type="button" onClick={addExistingParticipant}>Aggiungi Partecipante Esistente</button>

            <input type="text" placeholder="Nome" value={newParticipant.nome} onChange={(e) => setNewParticipant({ ...newParticipant, nome: e.target.value })}/>
            <input type="text" placeholder="Cognome" value={newParticipant.cognome} onChange={(e) => setNewParticipant({ ...newParticipant, cognome: e.target.value })} />
            <input type="text" placeholder="Codice Fiscale" value={newParticipant.codice_fiscale} onChange={(e) => setNewParticipant({ ...newParticipant, codice_fiscale: e.target.value })}/>
            <input type="email" placeholder="Email" value={newParticipant.email} onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}/>
            <input type="date" value={newParticipant.data_nascita} onChange={(e) => setNewParticipant({ ...newParticipant, data_nascita: e.target.value })}/>
            <input type="text" placeholder="Comune di Nascita" value={newParticipant.comune_nascita} onChange={(e) => setNewParticipant({ ...newParticipant, comune_nascita: e.target.value })}/>
            <input type="text" placeholder="Provincia Comune di Nascita" value={newParticipant.provincia_comune_nascita} onChange={(e) => setNewParticipant({ ...newParticipant, provincia_comune_nascita: e.target.value })}/>
            <input type="text" placeholder="Mansione" value={newParticipant.mansione} onChange={(e) => setNewParticipant({ ...newParticipant, mansione: e.target.value })}/>
            <input type="text" placeholder="Azienda" value={newParticipant.azienda} onChange={(e) => setNewParticipant({ ...newParticipant, azienda: e.target.value })}/>
            <input type="text" placeholder="Partita IVA Azienda" value={newParticipant.partita_iva_azienda} onChange={(e) => setNewParticipant({ ...newParticipant, partita_iva_azienda: e.target.value })}/>
            <button type="button" onClick={addNewParticipant}>Aggiungi Partecipante</button>

            {/* Input durata del corso */}
            <h3>Durata del Corso</h3>
            <ul>
                {courseData.durata_corso.map(({ giorno, durata_ore }, index) => (
                    <li key={index}>
                        Giorno: {new Date(giorno).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}, 
                        Durata Ore: {durata_ore}
                        <button type="button" onClick={() => {setCourseData((prev) => ({...prev, durata_corso: prev.durata_corso.filter((_, i) => i !== index)}))}}>Elimina</button>
                    </li>
                ))}
            </ul>
            <input type="date" value={durationDay.giorno} onChange={(e) => setDurationDay({ ...durationDay, giorno: e.target.value })}/>
            <input type="number" placeholder="Durata in ore" value={durationDay.durata_ore} onChange={(e) => setDurationDay({ ...durationDay, durata_ore: e.target.value })}/>
            <button type="button" onClick={addDurationDay}>Aggiungi Data</button>

            {/* Programma del corso selezionato */}
            <h3>Programma del Corso</h3>
            <ul>
                {courseData.programma_corso.map((modulo, index) => (
                    <li key={index}>
                        Modulo: {modulo.modulo}, Descrizione: {modulo.descrizione}, Durata: {modulo.durata} minuti
                    </li>
                ))}
            </ul>

            {/* Pulsante di invio */}
            <button type="submit">Aggiorna Corso</button>
        </form>
    );
}

export default UpdateCourse;

