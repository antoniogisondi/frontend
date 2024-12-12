import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { getCourseDetails } from '../../services/courseService';
import Loader from '../Loader/Loader'; 
import './CourseDetails.css';

function CourseDetails() {
    const { id } = useParams(); 
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const data = await getCourseDetails(id);
                setCourse(data.course);
                setLoading(false);
            } catch (err) {
                console.error('Errore durante il recupero dei dettagli del corso:', err);
                setError('Errore durante il recupero dei dettagli del corso.');
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (loading) return <div className="container text-center mt-5"><Loader /></div>;
    if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">{course.nome_corso}</h1>
            <div className="row">
                <div className="col-md-6">
                    <p><strong>Numero Autorizzazione:</strong> {course.numero_autorizzazione || 'N/A'} del {new Date(course.data_richiesta).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                    <p><strong>Categoria:</strong> {course.categoria_corso || 'N/A'}</p>
                    <p><strong>Indirizzo:</strong> {course.indirizzo_di_svolgimento}, {course.città_di_svolgimento} ({course.provincia})</p>
                </div>
                <div className="col-md-6 text-end">
                    <h4 className={`badge ${course.status === 'Completato' ? 'bg-success' : course.status === 'Attivo' ? 'bg-primary' : 'bg-secondary'}`}>
                        {course.status || 'N/A'}
                    </h4>
                </div>
            </div>

            <h3 className="mt-4">Durata del Corso</h3>
            <ul className="list-group mb-4">
                {course.durata_corso.map(({ giorno, durata_ore }, index) => (
                    <li key={index} className="list-group-item">
                        <strong>Giorno:</strong> {new Date(giorno).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}, 
                        <strong> Durata Ore:</strong> {durata_ore}
                    </li>
                ))}
            </ul>

            <h3>Programma del Corso</h3>
            <ul className="list-group mb-4">
                {course.programma_corso.map((modulo, index) => (
                    <li key={index} className="list-group-item">
                        <strong>Modulo:</strong> {modulo.modulo}
                        <br />
                        <strong>Descrizione:</strong> {modulo.descrizione}
                        <br />
                        <strong>Durata:</strong> {modulo.durata} ore
                    </li>
                ))}
            </ul>

            <h3>Partecipanti</h3>
            {course.partecipanti && course.partecipanti.length > 0 ? (
                <ul className="list-group">
                    {course.partecipanti.map((p) => (
                        <li key={p._id} className="list-group-item">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>{p.nome} {p.cognome}</strong></p>
                                    <p><strong>Email:</strong> {p.email || 'N/A'}</p>
                                    <p><strong>Codice Fiscale:</strong> {p.codice_fiscale}</p>
                                    <p><strong>Nato a:</strong> {p.comune_nascita}, {p.provincia_comune_nascita.toUpperCase()} il {new Date(p.data_nascita).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                                </div>
                                <div className="col-md-6">
                                    {(!p.mansione && !p.azienda && !p.partita_iva_azienda) ? (
                                        <p><em>Azienda, mansione e partita IVA non specificati</em></p>
                                    ) : (
                                        <p>
                                            <strong>Mansione:</strong> {p.mansione || 'N/A'}, 
                                            <strong> Azienda:</strong> {p.azienda || 'N/A'} 
                                            <strong> (P.IVA:</strong> {p.partita_iva_azienda || 'N/A'})
                                        </p>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted">Nessun partecipante registrato.</p>
            )}
        </div>
    );
}

export default CourseDetails;
