import React, {useState, useEffect} from 'react'
import { createCourse, getAllParticipants } from '../../services/courseService';
import './CreateCourse.css'

function CreateCourse() {
    // INIZIALIZZO LO STATO DEL CORSO
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

    // INIZIALIZZO LO STATO DEL PARTECIPANTE
    const [partecipante, setPartecipante] = useState({
        nome: '',
        cognome: '',
        email: '',
        data_nascita: '',
        comune_nascita: '',
        provincia_comune_nascita: '',
        mansione: '',
        azienda: '',
        partita_iva_azienda: '',
    });
    
    // INIZIALIZZO LO STATO PER L'AGGIUNTA DELLA DURATA
    const [durationDay, setDurationDay] = useState({ giorno: '', durata_ore: '' });

    // INIZIALIZZO LO STATO PER L'AGGIUNTA DEL MODULO
    const [module, setModule] = useState({ modulo: '', descrizione: '', durata: '' });

    // INIZIALIZZO LO STATO PER L'AGGIUNTA DI TUTTI I PARTECIPANTI NELLA SELECT
    const [allParticipants, setAllParticipants] = useState([]);
    const [selectedParticipantId, setSelectedParticipantId] = useState('');

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const participants = await getAllParticipants();
                setAllParticipants(participants);
            } catch (error) {
                console.error('Errore durante il recupero dei partecipanti:', error);
                alert('Errore durante il recupero dei partecipanti.');
            }
        };

        fetchParticipants();
    }, []);

    // GESTIONE DEGLI INPUT GENERICI
    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };


    // INSERIMENTO DEL NUOVO PARTECIPANTE 
    const addPartecipante = () => {
        if (
            !partecipante.nome ||
            !partecipante.cognome ||
            !partecipante.data_nascita ||
            !partecipante.comune_nascita ||
            !partecipante.provincia_comune_nascita
        ) {
            alert('Compila tutti i campi del partecipante.');
            return;
        }
    
        setCourseData((prev) => ({
            ...prev,
            partecipanti: [...(prev.partecipanti || []), partecipante],
        }));
    
        setPartecipante({
            nome: '',
            cognome: '',
            email: '',
            data_nascita: '',
            comune_nascita: '',
            provincia_comune_nascita: '',
            mansione: '',
            azienda: '',
            partita_iva_azienda: '',
        });
    };

    // INSERIMENTO PARTECIPANTE ESISTENTE
    const addExistingParticipant = () => {
        const participant = allParticipants.find((p) => p._id === selectedParticipantId);
    
        if (!participant) {
            alert('Seleziona un partecipante valido.');
            return;
        }
    
        if (courseData.partecipanti && courseData.partecipanti.some((p) => p._id === participant._id)) {
            alert('Il partecipante è già associato a questo corso.');
            return;
        }
    
        setCourseData((prev) => ({
            ...prev,
            partecipanti: [...(prev.partecipanti || []), participant], // Assicurati che partecipanti sia un array
        }));
    
        setSelectedParticipantId('');
    };
    
    // INSERIMENTO DURATA DEL CORSO
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

    // INSERIMENTO DEL MODULO
    const addModule = () => {
        if (!module.modulo || !module.descrizione || !module.durata) {
            alert('Compila tutti i campi del modulo.');
            return;
        }
    
        setCourseData((prev) => ({
            ...prev,
            programma_corso: [...prev.programma_corso, module],
        }));
    
        setModule({ modulo: '', descrizione: '', durata: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(courseData)
        try {
            const response = await createCourse(courseData);
            alert('Corso creato con successo!');
            console.log(response);
            setCourseData({
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
                partecipanti: [],
            });
        } catch (error) {
            console.error('Errore durante la creazione del corso:', error);
            alert('Errore durante la creazione del corso.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="nome_corso"
            placeholder="Nome del corso"
            value={courseData.nome_corso}
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

        <h3>Partecipanti</h3>
        <ul>
            {courseData.partecipanti?.map((p, index) => (
                <li key={index}>
                    <strong>{p.nome} {p.cognome}</strong> - {p.email}
                    <br />
                    Nato a {p.comune_nascita}, {p.provincia_comune_nascita} il {new Date(p.data_nascita).toLocaleDateString()}
                    <br />
                    Mansione: {p.mansione}, Azienda: {p.azienda} (P.IVA: {p.partita_iva_azienda})
                </li>
            ))}
        </ul>
        <h4>Aggiungi Partecipante Esistente</h4>
            <select
                value={selectedParticipantId}
                onChange={(e) => setSelectedParticipantId(e.target.value)}
            >
                <option value="">-- Seleziona un partecipante --</option>
                {allParticipants.map((p) => (
                    <option key={p._id} value={p._id}>
                        {p.nome} {p.cognome} - {p.email}
                    </option>
                ))}
            </select>
            <button type="button" onClick={addExistingParticipant}>
                Aggiungi Partecipante Esistente
            </button>
        <input
            type="text"
            placeholder="Nome"
            value={partecipante.nome}
            onChange={(e) => setPartecipante({ ...partecipante, nome: e.target.value })}
        />
        <input
            type="text"
            placeholder="Cognome"
            value={partecipante.cognome}
            onChange={(e) => setPartecipante({ ...partecipante, cognome: e.target.value })}
        />
        <input
            type="email"
            placeholder="Email"
            value={partecipante.email}
            onChange={(e) => setPartecipante({ ...partecipante, email: e.target.value })}
        />
        <input
            type="date"
            value={partecipante.data_nascita}
            onChange={(e) => setPartecipante({ ...partecipante, data_nascita: e.target.value })}
        />
        <input
            type="text"
            placeholder="Comune di Nascita"
            value={partecipante.comune_nascita}
            onChange={(e) => setPartecipante({ ...partecipante, comune_nascita: e.target.value })}
        />
        <input
            type="text"
            placeholder="Provincia Comune di Nascita"
            value={partecipante.provincia_comune_nascita}
            onChange={(e) => setPartecipante({ ...partecipante, provincia_comune_nascita: e.target.value })}
        />
        <input
            type="text"
            placeholder="Mansione"
            value={partecipante.mansione}
            onChange={(e) => setPartecipante({ ...partecipante, mansione: e.target.value })}
        />
        <input
            type="text"
            placeholder="Azienda"
            value={partecipante.azienda}
            onChange={(e) => setPartecipante({ ...partecipante, azienda: e.target.value })}
        />
        <input
            type="text"
            placeholder="Partita IVA Azienda"
            value={partecipante.partita_iva_azienda}
            onChange={(e) => setPartecipante({ ...partecipante, partita_iva_azienda: e.target.value })}
        />
        <button type="button" onClick={addPartecipante}>Aggiungi Partecipante</button>

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