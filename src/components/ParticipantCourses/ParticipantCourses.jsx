import React, { useState, useEffect } from 'react';
import { useParticipantAuth } from '../../context/ParticipantAuthContext';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './ParticipantCourses.css';

function ParticipantCourses() {
    const { participantDetails } = useParticipantAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const participantCourses = participantDetails.courseId;

    useEffect(() => {
        try {
            if (participantCourses && participantDetails) {
                setCourses(participantCourses);
            } else {
                setError('Non ci sono corsi associati a questo partecipante');
            }
        } catch (error) {
            setError(error.message || 'Errore durante il recupero dei corsi');
        } finally {
            setLoading(false);
        }
    }, [participantCourses, participantDetails]);

    if (loading) return <div className='container-fluid gx-0'><Loader /></div>;

    return (
        <div className="container my-5 participant-courses-page">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2 className="text-center mb-4">I tuoi Corsi</h2>
            {courses.length === 0 ? (
                <p className="text-center text-muted">Non sei ancora iscritto a nessun corso.</p>
            ) : (
                <div className="row">
                    {courses.map((course) => (
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
                                    <Link className="btn btn-primary btn-sm w-100" to={`/participant-dashboard/corsi/${course._id}`}>
                                        Visualizza i dettagli
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default ParticipantCourses;
