import React, {useState} from 'react'
import { generateCertificate } from '../../services/participantService'

function DownloadCertificate({courseId, participantId}) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log({participantId, courseId})
            const response = await generateCertificate(participantId, courseId);

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            // Creazione di un link per forzare il download
            const link = document.createElement('a');
            link.href = url;
            link.download = `Attestato_${courseId}.pdf`;
            document.body.appendChild(link);
            link.click();

            // Rimozione del link temporaneo
            document.body.removeChild(link);
        } catch (err) {
            setError('Errore durante la generazione dell\'attestato.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <button onClick={handleDownload} disabled={loading} className="btn btn-primary">
            {error && <p style={{color: 'red'}}>{error}</p>}
            {loading ? 'Generazione in corso...' : 'Genera Attestato'}
        </button>
    )
}

export default DownloadCertificate