import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export const registerUser = (userData) => API.post('/auth/register', userData)
export const loginUser = (userData) => API.post('/auth/login', userData)

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