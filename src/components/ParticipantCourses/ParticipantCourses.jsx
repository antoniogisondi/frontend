import React, { useState, useEffect } from 'react';
import { useParticipantAuth } from '../../context/ParticipantAuthContext';
import { createPayment } from '../../services/participantService';
import DownloadCertificate from '../DownloadCertificate/DownloadCertificate';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Loader from '../Loader/Loader';
import './ParticipantCourses.css';

function ParticipantCourses() {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const { participantDetails } = useParticipantAuth();
    const [courses, setCourses] = useState([]);
    const [paidCourses, setPaidCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const participantCourses = participantDetails.courseId;

    useEffect(() => {
        try {
            if (participantCourses && participantDetails) {
                setCourses(participantCourses);

                // Calcola i corsi pagati
                const paidCoursesList = participantCourses.map(course => {
                    const isPaid = participantDetails.payments.some(payment => 
                        payment.courseId === course._id && payment.status === 'succeeded'
                    );
                    return { courseId: course._id, isPaid };
                });

                setPaidCourses(paidCoursesList);
            } else {
                setError('Non ci sono corsi associati a questo partecipante');
            }
        } catch (error) {
            setError(error.message || 'Errore durante il recupero dei corsi');
        } finally {
            setLoading(false);
        }
    }, [participantCourses, participantDetails]);

    const handlePayment = async (participantId, courseId, nome_corso, autorizzazione, costo) => {
        try {
            const stripe = await stripePromise;
            const response = await createPayment(participantId, courseId, nome_corso, autorizzazione, costo);
            stripe.redirectToCheckout({ sessionId: response.id });
        } catch (error) {
            setError('Errore durante la creazione della sessione di pagamento.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className='container-fluid gx-0'><Loader /></div>;

    return (
        <div className="container my-5 participant-courses-page">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2 className="text-center mb-4">I tuoi Corsi</h2>
            {courses.length === 0 ? (
                <p className="text-center text-muted">Non sei ancora iscritto a nessun corso.</p>
            ) : (
                <div className="row">
                    {courses.map((course) => {
                        const isPaid = paidCourses.find(p => p.courseId === course._id)?.isPaid;

                        return (
                            <div className="col-md-4 mb-4" key={course._id}>
                                <div className="card shadow-sm course-card">
                                    <div className="card-body">
                                        <h5 className="card-title">{course.nome_corso}</h5>
                                        <p className="card-text">
                                            <strong>Categoria:</strong> {course.categoria_corso}<br />
                                            <strong>Stato:</strong> {course.status}<br />
                                            <strong>Durata Totale:</strong> {Array.isArray(course.durata_corso) && course.durata_corso.length > 0
                                                ? course.durata_corso.reduce((acc, curr) => acc + curr.durata_ore, 0)
                                                : 'N/A'
                                            } ore
                                        </p>
                                        <Link className="btn btn-primary btn-sm w-100">
                                            Visualizza i dettagli
                                        </Link>
                                        {course.status === 'Completato' && isPaid ? (
                                            <div>
                                                <DownloadCertificate courseId={course._id} participantId={participantDetails._id} />
                                            </div>
                                        ) : course.status === 'Completato' && !isPaid ? (
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() => handlePayment(participantDetails._id, course._id, course.nome_corso, course.numero_autorizzazione, course.costo)}
                                            >
                                                Effettua il pagamento
                                            </button>
                                        ) : course.status === 'Attivo' ? (
                                            <p>Il corso è iniziato</p>
                                        ) : (
                                            <p>Il corso deve ancora iniziare</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ParticipantCourses;
