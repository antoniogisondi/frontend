import API from "./api";

// API DEI CORSI

// API per la creazione del corso
export const createCourse = async (courseData) => {
    const response = await API.post('/courses/create-course', courseData)
    return response.data
}

// Recupera tutti i corsi
export const getAllCourses = async () => {
    const response = await API.get('/courses/all-courses');
    return response.data;
};

// API per la pagina di dettaglio del corso
export const getCourseDetails = async (courseId) => {
    const response = await API.get(`/courses/${courseId}`);
    return response.data;
};

// API per la modifica del corso
export const updateCourse = async (courseId, update) => {
    const response = API.put(`/courses/${courseId}/modifica`, update)
    return response.data
}

// API per l'eliminazione del corso
export const deleteCourse = async (courseId) => {
    const response = API.delete(`/courses/${courseId}/cancella`)
    return await response.data
}

// API DEI PARTECIPANTI

// API per il recupero dei partecipanti
export const getAllParticipants = async (searchTerm) => {
    try {
        // Effettua una richiesta GET con il parametro di ricerca
        const response = await API.get(`/participants/select`);

        // Restituisce i dati dei partecipanti
        return response.data;
    } catch (error) {
        console.error('Errore durante la ricerca dei partecipanti:', error);
        throw new Error('Impossibile recuperare i partecipanti.');
    }
};

// API per la pagina di dettaglio dei partecipanti
export const getParticipantsById = async (id) => {
    const response = await API.get(`/participants/${id}`)
    return response.data
}

// API per la modifica del partecipante
export const updateParticipants = async (participantId, update) => {
    const response = API.put(`/participants/${participantId}/modifica`, update)
    return response.data
}

// API per l'eliminazione del partecipante
export const deleteParticipant = async (id) => {
    const response = await API.delete(`/participants/${id}/elimina`)
    return response.data
}