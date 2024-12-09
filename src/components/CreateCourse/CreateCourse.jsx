import React, { useState, useEffect } from 'react';
import { createCourse, getAllParticipants } from '../../services/courseService';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import courses from '../../services/courses';
import './CreateCourse.css';

function CreateCourse() {
    const navigate = useNavigate()
    // Inizializzo gli stati 
    const [selectedCourse, setSelectedCourse] = useState('');
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
    const [partecipante, setPartecipante] = useState({
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
    const [allParticipants, setAllParticipants] = useState([]);
    const [selectedParticipantId, setSelectedParticipantId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // utilizzo lo useEffect per montare i partecipanti 
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const participants = await getAllParticipants();
                setAllParticipants(participants);
            } catch (error) {
                console.error('Errore durante il recupero dei partecipanti:', error);
                setError('Errore durante il recupero dei partecipanti')
            } finally {
                setLoading(false)
            }
        };

        fetchParticipants();
    }, []);

    const handleCourseSelect = (e) => {
        const selected = courses.find((course) => course.nome_corso === e.target.value);
        setSelectedCourse(selected.nome_corso);
        setCourseData((prev) => ({
            ...prev,
            nome_corso: selected.nome_corso,
            programma_corso: selected.programma_corso,
        }));
    };

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    // Funzione per aggiungere i partecipanti
    const addPartecipante = () => {
        if (!partecipante.nome || !partecipante.cognome || !partecipante.data_nascita || !partecipante.codice_fiscale) {
            setError('Compila tutti i campi richiesti del partecipante.');
            return;
        }

        setCourseData((prev) => ({
            ...prev,
            partecipanti: [...(prev.partecipanti || []), partecipante],
        }));

        setPartecipante({
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
        setError(null)
    };

    // Funzione per aggiungere un partecipante esistente da una lista
    const addExistingParticipant = () => {
        const participant = allParticipants.find((p) => p._id === selectedParticipantId);

        if (!participant) {
            setError('Seleziona un partecipante valido.');
            return;
        }

        if (courseData.partecipanti.some((p) => p._id === participant._id)) {
            setError('Il partecipante è già associato a questo corso.');
            return;
        }

        setCourseData((prev) => ({
            ...prev,
            partecipanti: [...(prev.partecipanti || []), participant],
        }));

        setSelectedParticipantId('');
        setError(null)
    };

    // Funzione per rimuovere il partecipante
    const removeParticipant = (index) => {
        setCourseData((prev) => ({
            ...prev,
            partecipanti: prev.partecipanti.filter((_, i) => i !== index),
        }));
    };

    // Funzione per aggiungere la durata del corso
    const addDurationDay = () => {
        if (!durationDay.giorno || !durationDay.durata_ore) {
            setError('Compila sia il giorno che la durata in ore.');
            return;
        }

        const today = new Date().setHours(0,0,0,0)
        const selectedDate = new Date(durationDay.giorno).setHours(0,0,0,0)

        if (selectedDate <= today) {
            setError('La data selezionata deve essere maggiore della data odierna')
            return
        }

        setCourseData((prev) => ({
            ...prev,
            durata_corso: [...prev.durata_corso, durationDay],
        }));

        setDurationDay({ giorno: '', durata_ore: '' });
        setError(null)
    };

    // Funzione per rimuovere la durata del corso
    const removeDurationDay = (index) => {
        setCourseData((prev) => ({
            ...prev,
            durata_corso: prev.durata_corso.filter((_, i) => i !== index),
        }));
    };

    // Funzione per sottomettere la form ed inviare i dati
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        try {
            const response = await createCourse(courseData);
            setCourseData({
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
                partecipanti: [],
            });
            setLoading(true)
            navigate('/dashboard/corsi')
        } catch (error) {
            setError('Errore durante la creazione del corso.');
        } finally {
            setLoading(false)
        }
    };

    // Caricamento o errore
    if (loading) return <div><Loader/></div>;

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">Crea Nuovo Corso</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                {/* Nome del Corso */}
                <div className="mb-3">
                    <label htmlFor="courseSelect" className="form-label">Nome del Corso</label>
                    <select id="courseSelect" value={selectedCourse} onChange={handleCourseSelect} className="form-select" required>
                        <option value="">Seleziona un corso</option>
                        {courses.map((course, index) => (
                            <option key={index} value={course.nome_corso}>{course.nome_corso}</option>
                        ))}
                    </select>
                </div>

                {/* Altri Campi del Corso */}
                {[
                    { name: 'indirizzo_di_svolgimento', label: 'Indirizzo di Svolgimento', type: 'text' },
                    { name: 'cap_sede_corso', label: 'CAP Sede Corso', type: 'text' },
                    { name: 'città_di_svolgimento', label: 'Città di Svolgimento', type: 'text' },
                    { name: 'provincia', label: 'Provincia', type: 'text' },
                    { name: 'direttore_corso', label: 'Direttore del Corso', type: 'text' },
                    { name: 'docente_corso', label: 'Docente del Corso', type: 'text' },
                    { name: 'categoria_corso', label: 'Categoria del Corso', type: 'text' },
                ].map(({ name, label, type }) => (
                    <div className="mb-3" key={name}>
                        <label htmlFor={name} className="form-label">{label}</label>
                        <input id={name} name={name} type={type} value={courseData[name]} onChange={handleChange} className="form-control" required/>
                    </div>
                ))}

                <h3>Programma del Corso</h3>
                    <ul>
                        {courseData.programma_corso.map((modulo, index) => (
                            <li key={index}>
                                Modulo: {modulo.modulo}, Descrizione: {modulo.descrizione}, Durata: {modulo.durata} minuti
                            </li>
                        ))}
                    </ul>

                {/* Partecipanti */}
                <h3>Partecipanti</h3>
                <ul className="list-group mb-3">
                    {courseData.partecipanti?.map((p, index) => (
                        <li className="list-group-item" key={index}>
                            <strong>{p.nome} {p.cognome}</strong> - {p.codice_fiscale}
                            <button type="button" onClick={() => removeParticipant(index)}>Rimuovi</button>
                        </li>
                    ))}
                </ul>

                {/* Aggiungi Partecipante Esistente */}
                <div className="mb-3">
                    <label htmlFor="existingParticipant" className="form-label">Aggiungi Partecipante Esistente</label>
                    <select id="existingParticipant" value={selectedParticipantId} onChange={(e) => setSelectedParticipantId(e.target.value)} className="form-select">
                        <option value="">Seleziona un partecipante</option>
                        {allParticipants.map((p) => (
                            <option key={p._id} value={p._id}>{p.nome} {p.cognome}</option>
                        ))}
                    </select>
                    <button type="button" onClick={addExistingParticipant} className="btn btn-outline-primary mt-2">Aggiungi</button>
                </div>

                {/* Aggiungi Nuovo Partecipante */}
                <h4>Aggiungi Nuovo Partecipante</h4>
                {[
                    { name: 'nome', label: 'Nome', type: 'text' },
                    { name: 'cognome', label: 'Cognome', type: 'text' },
                    {name: 'codice_fiscale', label: 'Codice Fiscale', type: 'text'},
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'data_nascita', label: 'Data di Nascita', type: 'date' },
                    { name: 'comune_nascita', label: 'Comune di Nascita', type: 'text' },
                    { name: 'provincia_comune_nascita', label: 'Provincia Comune Nascita', type: 'text' },
                    { name: 'mansione', label: 'Mansione', type: 'text' },
                    { name: 'azienda', label: 'Azienda', type: 'text' },
                    { name: 'partita_iva_azienda', label: 'Partita IVA Azienda', type: 'text' },
                ].map(({ name, label, type }) => (
                    <div className="mb-3" key={name}>
                        <label htmlFor={name} className="form-label">{label}</label>
                        <input id={name} name={name} type={type} value={partecipante[name]} onChange={(e) => setPartecipante({ ...partecipante, [name]: e.target.value })} className="form-control"/>
                    </div>
                ))}
                <button type="button" onClick={addPartecipante} className="btn btn-outline-secondary mb-4">Aggiungi Partecipante</button>

                {/* Durata del Corso */}
                <h3>Durata del Corso</h3>
                <ul>
                    {courseData.durata_corso.map(({giorno, durata_ore}, index) => (
                        <li key={index}>
                            Giorno: {new Date(giorno).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}, 
                            Durata Ore: {durata_ore}
                            <button type='button' className='btn btn-danger btn-sm' onClick={() => removeDurationDay(index)}>Rimuovi</button>
                        </li>
                    ))}
                </ul>
                <div className="mb-3">
                    <label htmlFor="giorno" className="form-label">Giorno</label>
                    <input id="giorno" name="giorno" type="date" value={durationDay.giorno} onChange={(e) => setDurationDay({ ...durationDay, giorno: e.target.value })} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="durata_ore" className="form-label"> Durata (Ore) </label>
                    <input id="durata_ore" name="durata_ore" type="number" value={durationDay.durata_ore} onChange={(e) => setDurationDay({ ...durationDay, durata_ore: e.target.value })} className="form-control"/>
                </div>
                <button type="button" onClick={addDurationDay} className="btn btn-outline-primary mb-3">Aggiungi Data</button>

                <button type="submit" className="btn btn-primary w-100">Crea Corso</button>
            </form>
        </div>
    );
}

export default CreateCourse;

