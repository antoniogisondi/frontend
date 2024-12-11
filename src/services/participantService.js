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


export const createPayment = async ( participantId, courseId) => {
    try {
        const token = localStorage.getItem('participantToken')
        const response = await API.post('/payments/courses', {
            courseId,
            participantId
        },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        console.log(response.data)
        return response.data  
    } catch (error) {
        console.error('Errore durante la creazione del pagamento:', error);
        throw error; 
    }
}