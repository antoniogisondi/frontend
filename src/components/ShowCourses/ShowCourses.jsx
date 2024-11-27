import React, { useEffect, useState } from 'react'
import { getAllCourses, deleteCourse } from '../../services/courseService'
import { Link } from 'react-router-dom';
import './ShowCourses.css'

function ShowCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourses();
                setCourses(data); // Salva i corsi nello stato
                setLoading(false);
            } catch (err) {
                console.error('Errore nel recupero dei corsi:', err.message);
                setError('Errore durante il recupero dei corsi.');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Sei sicuro di voler eliminare questo corso?')) {
            try {
                await deleteCourse(id);
                alert('Corso eliminato con successo!');
                setCourses(courses.filter((course) => course._id !== id)); // Aggiorna la lista
            } catch (error) {
                console.error('Errore durante l\'eliminazione del corso:', error);
                alert('Errore durante l\'eliminazione del corso.');
            }
        }
    };

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Link to='/dashboard/crea-corso'>Crea un corso</Link>
            <h2>Elenco dei Corsi</h2>
            {courses.length === 0 ? ( // Controlla se la lista è vuota
                <p style={{ color: 'gray', fontStyle: 'italic' }}>Attualmente non ci sono corsi disponibili.</p>
            ) : (
                <ul>
                    {courses.map((course, index) => (
                        <li key={course._id}>
                        <h3>{index + 1}. {course.nome_corso}</h3>
                        <p><strong>N. Aut:</strong> {course.numero_autorizzazione}</p>
                        <p><strong>Categoria:</strong> {course.categoria_corso}</p>
                        <Link to={`/dashboard/corsi/${course._id}`}>Vai al dettaglio</Link>
                        <Link to={`/dashboard/corsi/${course._id}/modifica`}>Vai al dettaglio</Link>
                        <form  onClick={() => handleDelete(course._id)}>
                            <button
                                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                                Elimina
                            </button>
                        </form>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShowCourses