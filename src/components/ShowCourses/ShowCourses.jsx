import React, { useEffect, useState } from 'react'
import { getAllCourses } from '../../services/courseService'
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
                        <p><strong>Indirizzo:</strong> {course.indirizzo_di_svolgimento}, {course.città_di_svolgimento} ({course.provincia})</p>
                        <p><strong>Durata Totale:</strong> {course.durata_corso.reduce((total, d) => total + d.durata_ore, 0)} ore</p>
                        <p><strong>Categoria:</strong> {course.categoria_corso}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowCourses