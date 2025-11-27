import { useState, useEffect } from 'react';
import api from './services/api';

function Piadas() {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const Piada = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await pegarPiada();
            setJoke(data);
        } catch (err) {
            console.error('Erro ao buscar piada:', err);
            setError('Erro ao carregar piada');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Piada();
    }, []);

    return (
        <div>
            {loading && <h1>Carregando...</h1>}
            {error && <h1>{error}</h1>}
            {!loading && !error && !joke && <h1>Nenhuma piada encontrada</h1>}

            {!loading && !error && joke && (
                <>
                    <h1>{joke.setup}</h1>
                    <h2>{joke.punchline}</h2>
                </>
            )}
            <button id="botao" onClick={Piada}>Buscar Piada</button>
        </div>
    );
}

async function pegarPiada() {
    try {
        const API = api.get("/random_joke");
        const data = (await API).data;
        return {
            setup: data.setup,
            punchline: data.punchline
        };
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

export default Piadas;