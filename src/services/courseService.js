import API from "./api";

export const createCourse = async (courseData) => {
    const response = await API.post('/courses/create-course', courseData)
    return response.data
}

// Recupera tutti i corsi
export const getAllCourses = async () => {
    const response = await API.get('/courses/all-courses');
    return response.data;
};

export const getCourseDetails = async (courseId) => {
    const response = await API.get(`/courses/${courseId}`);
    return response.data;
};

export const updateCourse = async (courseId, update) => {
    const response = API.put(`/courses/${courseId}/modifica`, update)
    return response.data
}

export const deleteCourse = async (courseId) => {
    const response = API.delete(`/courses/${courseId}/cancella`)
    return await response.data
}

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

export const getParticipantsById = async (id) => {
    const response = await API.get(`/participants/${id}`)
    return response.data
}

export const updateParticipants = async (participantId, update) => {
    const response = API.put(`/participants/${participantId}/modifica`, update)
    return response.data
}

export const deleteParticipant = async (id) => {
    const response = await API.delete(`/participants/${id}/elimina`)
    return response.data
}