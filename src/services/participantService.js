import API from "./api";

export const generateCertificate = async (participantId,courseId) => {
    const token = localStorage.getItem('participantToken')
    const response = await API.post('/participants/generate-certificate', {participantId, courseId},
        {
            headers: {
                Authorization: `Bearer ${token}`, // Invia il token
            },
            responseType: 'blob'
        }
    )
    return response.data
}


export const createPayment = async ( participantId, courseId, nome_corso, autorizzazione, costo) => {
    try {
        const token = localStorage.getItem('participantToken')
        const response = await API.post('/payments/courses', {
            participantId,
            courseId,
            nome_corso,
            autorizzazione,
            costo
        },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        return response.data  
    } catch (error) {
        console.error('Errore durante la creazione del pagamento:', error);
        throw error; 
    }
}
