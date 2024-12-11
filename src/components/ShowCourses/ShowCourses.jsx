import React, { useEffect, useState } from 'react'
import { getAllCourses, deleteCourse } from '../../services/courseService'
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import './ShowCourses.css'

function ShowCourses() {
    const [courses, setCourses] = useState([]);
    const [filterStatus, setFilterStatus] = useState('')
    const [filteredCourses, setFilteredCourses] = useState([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('')

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourses();
                setCourses(data); // Salva i corsi nello stato
                setFilteredCourses(data)
                setLoading(false);
            } catch (err) {
                setError('Errore durante il recupero dei corsi.');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setQuery(searchQuery);

        const filtered = courses.filter((course) => {
            const matchesQuery =
                course.numero_autorizzazione.toLowerCase().includes(searchQuery) ||
                course.nome_corso.toLowerCase().includes(searchQuery);

            const matchesStatus =
                filterStatus === 'Tutti' || course.status === filterStatus;

            return matchesQuery && matchesStatus;
        });

        setFilteredCourses(filtered);
    };

    const handleStatusClick = (status) => {
        setFilterStatus(status);

        const filtered = courses.filter((course) => {
            const matchesQuery =
                course.numero_autorizzazione.toLowerCase().includes(query) ||
                course.nome_corso.toLowerCase().includes(query);

            const matchesStatus =
                status === 'Tutti' || course.status === status;

            return matchesQuery && matchesStatus;
        });

        setFilteredCourses(filtered);
    };

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

    if (loading) return <div className='container-fluid'><Loader/></div>;

    return (
        <div className="container mt-5 show-courses-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="show-courses-title">Richiedi Corso in Aula</h1>
                <div>
                    <Link to="/dashboard/crea-corso" className="btn btn-primary me-2">+ Richiedi Corso</Link>
                    <button className="btn btn-secondary me-2">Lista Verbali</button>
                    <button className="btn btn-secondary">Lista Registri</button>
                </div>
            </div>
            <div className="filters-section mb-4">
                <div className="row">
                    <div className="col-md-3">
                        <label>Data inizio dal</label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-3">
                        <label>Al</label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label>Ricerca</label>
                        <input type="text" className="form-control" placeholder="Numero autorizzazione, titolo, indirizzo" value={query} onChange={handleSearch} />
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <button className="btn btn-dark">Cerca</button>
                    <button className="btn btn-light">Rimuovi Filtri</button>
                </div>
            </div>
            <div className="status-summary d-flex justify-content-around text-center mb-4">
                <button className={`btn ${filterStatus === 'Tutti' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleStatusClick('Tutti')}>
                    Tutti
                </button>
                <button className={`btn ${filterStatus === 'Richiesto' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleStatusClick('Richiesto')}>
                    Richiesti
                </button>
                <button className={`btn ${filterStatus === 'Attivo' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleStatusClick('Attivo')}>
                    Attivi
                </button>
                <button className={`btn ${filterStatus === 'Completato' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleStatusClick('Completato')}>
                    Completati
                </button>
            </div>
            <div className="courses-list">
            <h3 className="list-title">Lista in Bozza</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {courses.length === 0 ? (
                <p className="text-muted fst-italic">Attualmente non ci sono corsi disponibili.</p>
            ) : (
                <table className='table table-bordered'>
                    <thead className="table-light">
                        <tr>
                            <th>Corso Aula</th>
                            <th>Autorizzazione</th>
                            <th>Categoria</th>
                            <th>Indirizzo Sede</th>
                            <th>Data Inizio</th>
                            <th>Data Fine</th>
                            <th>Azione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course, index) => (
                                <tr key={course._id}>
                                <td>{index + 1}. {course.nome_corso}</td>
                                <td>{course.numero_autorizzazione}</td>
                                <td>{course.categoria_corso}</td>
                                <td>{course.indirizzo_di_svolgimento} - {course.cap_sede_corso} - {course.città_di_svolgimento} {course.provincia}</td>
                                <td>{new Date(course.durata_corso[0]?.giorno).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                <td>{new Date(course.durata_corso[course.durata_corso.length - 1]?.giorno).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                <td className="text-center">
                                    <Link to={`/dashboard/corsi/${course._id}`} className="btn btn-sm btn-info me-2">
                                        <i className="bi bi-eye"></i>
                                    </Link>
                                    <Link to={`/dashboard/corsi/${course._id}/modifica`} className="btn btn-sm btn-warning me-2">
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(course._id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            ))) : (
                            <tr>
                                <td>Nessun corso trovato</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );
};

export default ShowCourses