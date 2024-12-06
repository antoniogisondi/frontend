import React, { useEffect, useState } from 'react'
import { getAllCourses, deleteCourse } from '../../services/courseService'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import './ShowCourses.css'

function ShowCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('')

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourses();
                setCourses(data); // Salva i corsi nello stato
                setLoading(false);
            } catch (err) {
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
                setLoading(false)
                setSuccess('Corso eliminato con successo!');
                setCourses(courses.filter((course) => course._id !== id)); // Aggiorna la lista
            } catch (error) {
                setLoading(false)
                setError('Errore durante l\'eliminazione del corso.');
            }
        }
    };

    if (loading) return <div className='container-fluid'>
        <Loader/>
    </div>;

    return (
        <div>
            <Header/>
            <Link to='/dashboard/crea-corso'>Crea un corso</Link>
            <h2>Elenco dei Corsi</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
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
                        <Link to={`/dashboard/corsi/${course._id}/modifica`}>Vai alla modifica</Link>
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
            <Footer/>
        </div>
    );
};

export default ShowCourses