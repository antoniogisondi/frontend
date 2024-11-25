import React, { useEffect, useState } from 'react'
import { getAllCourses } from '../../services/courseService'
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

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Elenco dei Corsi</h2>
            <ul>
                {courses.map((course, index) => (
                    <li key={course._id}>
                        <h3>{index + 1}. {course.nome_corso}</h3>
                        <p><strong>N. Aut:</strong> {course.numero_autorizzazione}</p>
                        <p><strong>Categoria:</strong> {course.categoria_corso}</p>
                        <Link to={`/dashboard/corsi/${course._id}`}>Vai al dettaglio</Link>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
};

export default ShowCourses