import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';


function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(formData);
            login(data.token)
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Errore durante il login');
        }
    };
    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Accedi</button>
            </form>
        </div>
    )
}

export default LoginPage

