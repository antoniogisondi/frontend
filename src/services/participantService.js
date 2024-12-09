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