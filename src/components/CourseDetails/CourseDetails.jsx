import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Per leggere l'ID dal parametro della rotta
import { getCourseDetails } from '../../services/courseService';

function CourseDetails() {
    const { id } = useParams(); // Recupera l'ID del corso dalla rotta
    const [course, setCourse] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const data = await getCourseDetails(id);
                setCourse(data.course);
                setParticipants(data.partecipanti);
                setLoading(false);
            } catch (err) {
                console.error('Errore durante il recupero dei dettagli del corso:', err);
                setError('Errore durante il recupero dei dettagli del corso.');
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>{course.nome_corso}</h2>
            <p><strong>Numero Autorizzazione:</strong> {course.numero_autorizzazione} del {course.data_richiesta}</p>
            <p><strong>Categoria:</strong> {course.categoria_corso}</p>
            <p><strong>Indirizzo:</strong> {course.indirizzo_di_svolgimento}, {course.città_di_svolgimento} ({course.provincia})</p>

            <h3>Durata del Corso</h3>
            <ul>
                {course.durata_corso.map((d, index) => (
                    <li key={index}>Giorno: {d.giorno}, Durata Ore: {d.durata_ore}</li>
                ))}
            </ul>

            <h3>Programma del Corso</h3>
            <ul>
                {course.programma_corso.map((modulo, index) => (
                    <li key={index}>
                        <strong>Modulo:</strong> {modulo.modulo}
                        <br />
                        <strong>Descrizione:</strong> {modulo.descrizione}
                        <br />
                        <strong>Durata:</strong> {modulo.durata} minuti
                    </li>
                ))}
            </ul>

            <h3>Partecipanti</h3>
            {course.partecipanti && course.partecipanti.length > 0 ? (
                <ul>
                    {course.partecipanti.map((p) => (
                        <li key={p._id}>
                            <strong>{p.nome} {p.cognome}</strong> - {p.email} - {p.codice_fiscale}
                            <br />
                            Nato a {p.comune_nascita}, {p.provincia_comune_nascita} il {p.data_nascita}
                            <br />
                            {(!p.mansione && !p.azienda && !p.partita_iva_azienda) ? (
                                <p>Azienda mansione e partita iva non specificati</p>
                            ) : (
                                <p>Mansione: {p.mansione}, Azienda: {p.azienda} (P.IVA: {p.partita_iva_azienda})</p>
                            )}
                            
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nessun partecipante registrato.</p>
            )}
        </div>
    );
}

export default CourseDetails

