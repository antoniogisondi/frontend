import axios from "axios";

// creo l'endpoint per l'API
const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
})

// Invio i dati al backend per login e registrazione
export const registerUser = (userData) => API.post('/auth/register', userData)
export const loginUser = (userData) => API.post('/auth/login', userData)
export const loginParticipant = (participantData) => API.post('/auth/participant-login', participantData)

// Gestisco il token nel local storage
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/accesso'; // Reindirizza a login
        }
        return Promise.reject(error);
    }
);


export default API