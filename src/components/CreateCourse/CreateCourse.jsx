import React, {useState} from 'react'
import { createCourse } from '../../services/courseService';
import './CreateCourse.css'

function CreateCourse() {
    const [courseData, setCourseData] = useState({
        nome_corso: '',
        numero_partecipanti: '',
        indirizzo_di_svolgimento: '',
        cap_sede_corso: '',
        città_di_svolgimento: '',
        provincia: '',
        direttore_corso: '',
        docente_corso: '',
        categoria_corso: '',
        durata_corso: [],
        programma_corso: [],
    });

    const [durationDay, setDurationDay] = useState({ giorno: '', durata_ore: '' });
    const [module, setModule] = useState({ modulo: '', descrizione: '', durata: '' });

    // Gestione degli input generici
    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const addDurationDay = () => {
        if (!durationDay.giorno || !durationDay.durata_ore) {
            alert('Compila sia il giorno che la durata in ore.');
            return;
        }

        // Aggiunge la data e aggiorna lo stato
        setCourseData((prev) => ({
            ...prev,
            durata_corso: [...prev.durata_corso, durationDay],
        }));

        // Resetta i campi della data
        setDurationDay({ giorno: '', durata_ore: '' });
    };

    const addModule = () => {
        if (!module.modulo || !module.descrizione || !module.durata) {
            alert('Compila tutti i campi del modulo.');
            return;
        }
    
        // Aggiungi il modulo al programma del corso
        setCourseData((prev) => ({
            ...prev,
            programma_corso: [...prev.programma_corso, module],
        }));
    
        // Resetta i campi del modulo
        setModule({ modulo: '', descrizione: '', durata: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(courseData)
        try {
            const response = await createCourse(courseData);
            alert('Corso creato con successo!');
            console.log(response);
        } catch (error) {
            console.error('Errore durante la creazione del corso:', error);
            alert('Errore durante la creazione del corso.');
        }
    };



    return (
        <form onSubmit={handleSubmit}>
        {/* Campi statici */}
        <input
            type="text"
            name="nome_corso"
            placeholder="Nome del corso"
            value={courseData.nome_corso}
            onChange={handleChange}
            required
        />
        <input
            type="number"
            name="numero_partecipanti"
            placeholder="Numero partecipanti"
            value={courseData.numero_partecipanti}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="indirizzo_di_svolgimento"
            placeholder="Indirizzo di svolgimento"
            value={courseData.indirizzo_di_svolgimento}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="cap_sede_corso"
            placeholder="CAP sede corso"
            value={courseData.cap_sede_corso}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="città_di_svolgimento"
            placeholder="Città di svolgimento"
            value={courseData.città_di_svolgimento}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="provincia"
            placeholder="Provincia"
            value={courseData.provincia}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="direttore_corso"
            placeholder="Direttore del corso"
            value={courseData.direttore_corso}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="docente_corso"
            placeholder="Docente del corso"
            value={courseData.docente_corso}
            onChange={handleChange}
            required
        />
        <input
            type="text"
            name="categoria_corso"
            placeholder="Categoria del corso"
            value={courseData.categoria_corso}
            onChange={handleChange}
            required
        />

        <h3>Durata del Corso</h3>
        <ul>
            {courseData.durata_corso.map((item, index) => (
                <li key={index}>
                    Giorno: {item.giorno}, Durata Ore: {item.durata_ore}
                </li>
            ))}
        </ul>
        <input
            type="date"
            value={durationDay.giorno}
            onChange={(e) => setDurationDay({ ...durationDay, giorno: e.target.value })}
        />
        <input
            type="number"
            value={durationDay.durata_ore}
            onChange={(e) => setDurationDay({ ...durationDay, durata_ore: e.target.value })}
        />
        <button type="button" onClick={addDurationDay}>
            Aggiungi Data
        </button>

        <h3>Programma del Corso</h3>
        <ul>
            {courseData.programma_corso.map((modulo, index) => (
                <li key={index}>
                    <div>
                        <strong>Modulo:</strong> {modulo.modulo}
                    </div>
                    <div>
                        <strong>Titolo:</strong> {modulo.descrizione}, 
                        <strong> Durata:</strong> {modulo.durata} minuti
                    </div>
                </li>
            ))}
        </ul>  

        <h4>Aggiungi un Modulo</h4>
        <input
            type="text"
            placeholder="Nome Modulo"
            value={module.modulo}
            onChange={(e) => setModule({ ...module, modulo: e.target.value })}
        />
        <input
            type="text"
            placeholder="Descrizione Modulo"
            value={module.descrizione}
            onChange={(e) => setModule({ ...module, descrizione: e.target.value })}
        />
        <input
            type="number"
            placeholder="Durata Modulo (minuti)"
            value={module.durata}
            onChange={(e) => setModule({ ...module, durata: e.target.value })}
        />
        <button type="button" onClick={addModule}>
            Aggiungi Modulo
        </button>
        <button type="submit">Crea corso</button>
    </form>
    )
}

export default CreateCourse