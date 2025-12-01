import { useState, useEffect } from 'react';
import api from './services/api';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

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
        <div style={{
            fontFamily: '"Arial", "Helvetica", "sans-serif"',
            fontWeight: 'bold',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh'
        }}>
            {loading && <Typography fontWeight= 'fontWeightBold' fontSize={30}>Carregando...</Typography>}
            {error && <h1>{error}</h1>}
            {!loading && !error && !joke && <h1>Nenhuma piada encontrada</h1>}

            {!loading && !error && joke && (
                <>
                    <Typography fontWeight= 'fontWeightBold' fontSize={30}>{joke.setup}</Typography>
                    <Typography fontWeight= 'fontWeightBold' fontSize={30}>{joke.punchline}</Typography>
                </>
            )}
            <Button
                onClick={Piada} 
                variant="contained"
            >
                Buscar Piada
            </Button>
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