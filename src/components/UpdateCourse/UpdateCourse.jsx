import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseDetails, updateCourse } from '../../services/courseService';
import './UpdateCourse.css';

function UpdateCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

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
    });

    const [durationDay, setDurationDay] = useState({ giorno: '', durata_ore: '' });
    const [module, setModule] = useState({ modulo: '', descrizione: '', durata: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recupera i dettagli del corso
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourseDetails(id);
                setCourseData(data.course);
                setLoading(false);
            } catch (error) {
                console.error('Errore durante il recupero del corso:', error);
                setError('Errore durante il recupero del corso.');
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    // Gestisce i cambiamenti negli input generici
    const handleChange = (e) => {
        setCourseData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    // Aggiunge un giorno alla durata del corso
    const addDurationDay = () => {
        if (!durationDay.giorno || !durationDay.durata_ore) {
            alert('Compila sia il giorno che la durata in ore.');
            return;
        }

        setCourseData((prev) => ({
            ...prev,
            durata_corso: [...prev.durata_corso, durationDay],
        }));

        setDurationDay({ giorno: '', durata_ore: '' });
    };

    // Aggiunge un modulo al programma del corso
    const addModule = () => {
        if (!module.modulo || !module.descrizione || !module.durata) {
            alert('Compila tutti i campi del modulo.');
            return;
        }

        setCourseData((prev) => ({
            ...prev,
            programma_corso: [...prev.programma_corso, module],
        }));

        setModule({ modulo: '', descrizione: '', durata: '' });
    };

    // Gestisce l'invio del modulo
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateCourse(id, courseData);
            alert('Corso aggiornato con successo!');
            navigate(`/dashboard/corsi/${id}`);
        } catch (err) {
            console.error('Errore durante la modifica del corso:', err);
            alert('Errore durante la modifica del corso.');
        }
    };

    // Caricamento o errore
    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            {/* Campi del corso */}
            <input
                type="text"
                name="nome_corso"
                placeholder="Nome del corso"
                value={courseData.nome_corso}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="indirizzo_di_svolgimento"
                placeholder="Indirizzo di svolgimento"
                value={courseData.indirizzo_di_svolgimento}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="cap_sede_corso"
                placeholder="CAP sede corso"
                value={courseData.cap_sede_corso}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="città_di_svolgimento"
                placeholder="Città di svolgimento"
                value={courseData.città_di_svolgimento}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="provincia"
                placeholder="Provincia"
                value={courseData.provincia}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="direttore_corso"
                placeholder="Direttore del corso"
                value={courseData.direttore_corso}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="docente_corso"
                placeholder="Docente del corso"
                value={courseData.docente_corso}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="categoria_corso"
                placeholder="Categoria del corso"
                value={courseData.categoria_corso}
                onChange={handleChange}
                required
            />

            {/* Durata del corso */}
            <h3>Durata del Corso</h3>
            <ul>
                {courseData.durata_corso.map((item, index) => (
                    <li key={index}>
                        Giorno: {item.giorno}, Durata Ore: {item.durata_ore}
                        <button
                            type="button"
                            onClick={() => {
                                setCourseData((prev) => ({
                                    ...prev,
                                    durata_corso: prev.durata_corso.filter((_, i) => i !== index),
                                }));
                            }}
                        >
                            Elimina
                        </button>
                    </li>
                ))}
            </ul>
            <input
                type="date"
                value={durationDay.giorno}
                onChange={(e) => setDurationDay({ ...durationDay, giorno: e.target.value })}
            />
            <input
                type="number"
                placeholder="Durata in ore"
                value={durationDay.durata_ore}
                onChange={(e) => setDurationDay({ ...durationDay, durata_ore: e.target.value })}
            />
            <button type="button" onClick={addDurationDay}>
                Aggiungi Data
            </button>

            {/* Programma del corso */}
            <h3>Programma del Corso</h3>
            <ul>
                {courseData.programma_corso.map((modulo, index) => (
                    <li key={index}>
                        Modulo: {modulo.modulo}, Descrizione: {modulo.descrizione}, Durata: {modulo.durata} minuti
                        <button
                            type="button"
                            onClick={() => {
                                setCourseData((prev) => ({
                                    ...prev,
                                    programma_corso: prev.programma_corso.filter((_, i) => i !== index),
                                }));
                            }}
                        >
                            Elimina
                        </button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Nome Modulo"
                value={module.modulo}
                onChange={(e) => setModule({ ...module, modulo: e.target.value })}
            />
            <input
                type="text"
                placeholder="Descrizione Modulo"
                value={module.descrizione}
                onChange={(e) => setModule({ ...module, descrizione: e.target.value })}
            />
            <input
                type="number"
                placeholder="Durata Modulo (minuti)"
                value={module.durata}
                onChange={(e) => setModule({ ...module, durata: e.target.value })}
            />
            <button type="button" onClick={addModule}>
                Aggiungi Modulo
            </button>

            {/* Pulsante di invio */}
            <button type="submit">Aggiorna Corso</button>
        </form>
    );
}

export default UpdateCourse;

