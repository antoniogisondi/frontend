import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";


function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username:'',
        password: ''
    })

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await registerUser(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Errore durante la registrazione');
        }
    }
    return (
        <div>
            <h1>Registrazione</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nome" onChange={handleChange} />
                <input type="text" name="surname" placeholder="Cognome" onChange={handleChange} />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Registrati</button>
            </form>
        </div>
    )
}

export default RegisterPage
