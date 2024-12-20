import React, {useEffect} from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

function SuccessPaymentPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        const sessionId = searchParams.get('session_id')
        if (!sessionId) {
            navigate('/participant-dashboard/corsi')
            return
        }
    }, [searchParams, navigate])
    return (
        <div className="container text-center my-5">
            <h1>Grazie per il tuo acquisto!</h1>
            <p>Il tuo pagamento è andato a buon fine. A breve riceverai ulteriori informazioni.</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/participant-dashboard/corsi')}>
                Torna alla Dashboard
            </button>
        </div>
    )
}

export default SuccessPaymentPage