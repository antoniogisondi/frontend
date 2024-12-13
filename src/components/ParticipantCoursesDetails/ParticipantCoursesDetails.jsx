import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useParticipantAuth } from '../../context/ParticipantAuthContext'
import Loader from '../Loader/Loader'

function ParticipantCoursesDetails() {
    const {id} = useParams()
    const {participantDetails} = useParticipantAuth()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const participantCourses = participantDetails.courseId

    useEffect(() => {
        try { 
            if (participantDetails && participantCourses) {
                const specificCourse = participantCourses.find(c => c._id === id)
                if (specificCourse) {
                    setCourse(specificCourse)
                } else {
                    setError('Errore nel recupero dei dettagli del corso')
                }
            } else {
                setError('Errore nel recupero dei dettagli del corso')
            }
        } catch (error) {
            setError(error.message || 'Errore durante il recupero dei dettagli del corso')
        } finally {
            setLoading(false)
        }

    }, [id, participantCourses])

    if (loading) return <div className='container-fluid gx-0'><Loader/></div>
    
    
    return (
        <div className='container'>
            {error && <p style={{color:'red'}}>{error}</p>}
            {course && (
                <div className="row">
                    <div className="col">
                        <h1>{course.nome_corso}</h1>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ParticipantCoursesDetails