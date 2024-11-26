import React, {useState, useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { getCourseDetails, updateCourse } from '../../services/courseService'
import './UpdateCourse.css'

function UpdateCourse() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [courseData, setCourseData] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourseDetails(id)
                setCourseData(data.course)
                setLoading(false)
            } catch (error) {
                console.error('Errore durante il recupero del corso:', err);
                setError('Errore durante il recupero del corso.');
                setLoading(false);
            }
        }

        fetchCourse()
    }, [id])

    const handleChange = (e) => {
        setCourseData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCourse(id, courseData);
            alert('Corso aggiornato con successo!');
            navigate(`/dashboard/corsi/${id}`); // Torna alla pagina del corso
        } catch (err) {
            console.error('Errore durante la modifica del corso:', err);
            alert('Errore durante la modifica del corso.');
        }
    };

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>{error}</p>;
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Modifica Corso</h2>
            <input
                type="text"
                name="nome_corso"
                value={courseData.nome_corso || ''}
                onChange={handleChange}
                placeholder="Nome del corso"
            />
            <input
                type="text"
                name="categoria_corso"
                value={courseData.categoria_corso || ''}
                onChange={handleChange}
                placeholder="Categoria"
            />
            {/* Aggiungi altri campi per la modifica */}
            <button type="submit">Salva Modifiche</button>
        </form>
    )
}

export default UpdateCourse