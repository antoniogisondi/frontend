import React, {useEffect, useState} from 'react'
import DownloadCertificate from '../DownloadCertificate/DownloadCertificate';
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import { useParticipantAuth } from '../../context/ParticipantAuthContext'
import { createPayment } from '../../services/participantService';
import { loadStripe } from '@stripe/stripe-js';

function ParticipantCoursesDetails() {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const {id} = useParams()
    const {participantDetails} = useParticipantAuth()
    const [course, setCourse] = useState(null)
    const [isPaid, setIsPaid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorPaid, setErrorPaid] = useState(null);
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
                const paidId = specificCourse._id

                const isPaidCourse = participantDetails.payments.some(payment => 
                    payment.courseId === paidId && payment.status === 'succeeded'
                );

                if(isPaidCourse){
                    setIsPaid(isPaidCourse)
                } else {
                    setErrorPaid('Il corso risulta non pagato, effettua il pagamento per generare l\'attestato')
                }
            } else {
                setError('Errore nel recupero dei dettagli del corso')
            }
            
            
        } catch (error) {
            setError(error.message || 'Errore durante il recupero dei dettagli del corso')
        } finally {
            setLoading(false)
        }

    }, [id, participantCourses, participantDetails])

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

    if (loading) return <div className='container-fluid gx-0'><Loader/></div>
    
    
    return (
        <div className='container'>
            {error && <p style={{color:'red'}}>{error}</p>}
            {course && (
                <div className="row">
                    <div className="col">
                        {errorPaid && <p style={{color: 'black'}}>{errorPaid}</p>}
                        <h1>{course.nome_corso}</h1>
                        {course.status === 'Completato' && isPaid ? (
                            <DownloadCertificate courseId={course._id} participantId={participantDetails._id} />
                        ) : course.status === 'Completato' ? (
                        <button className="btn btn-primary w-100" onClick={() => handlePayment(participantDetails._id, course._id, course.nome_corso, course.numero_autorizzazione, course.costo)}>
                            Effettua il pagamento
                        </button>
                        ) :  course.status === 'Attivo' ?(
                            <p>Il corso è attivo</p>
                        ) : (
                            <p>Il corso è stato richiesto</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ParticipantCoursesDetails