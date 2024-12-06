import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { loginParticipant } from '../../services/api'
import { useParticipantAuth } from '../../context/ParticipantAuthContext'
import Loader from '../../components/Loader/Loader'

function LoginParticipantPage() {
    const [formData, setFormData] = useState({
        nome:'',
        cognome:'',
        codice_fiscale:''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {loginP} = useParticipantAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const {data} = await loginParticipant(formData)
            loginP(data.token, data.participant)
            navigate('/participant-dashboard')
        } catch (error) {
            setError(error.response?.data?.message || 'Errore durante il login');
        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return <div className="container-fluid">
            <Loader/>
        </div>
    }
    return (
        <div>
            <h1>Login Partecipante</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required/>
                <input type="text" name="cognome" placeholder="Cognome" onChange={handleChange} required/>
                <input type="text" name="codice_fiscale" placeholder="Codice Fiscale" onChange={handleChange} required/> 
                <button type="submit">Accedi</button>
            </form>
        </div>
    )
}

export default LoginParticipantPage