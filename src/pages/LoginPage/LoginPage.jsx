import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
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
        <div className='container-fluid gx-0'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Login</h1>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={handleSubmit} className='form-control'>
                            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                            <button type="submit">Accedi</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage

