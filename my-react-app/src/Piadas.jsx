import { useState, useEffect } from 'react';
import api from './services/api';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

    const theme = createTheme({
        palette: {
            custom: {
                red: '#f00',
                blue: '#00f'
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ textAlign: 'center' }}>
                {loading && <Typography fontWeight= 'fontWeightBold' fontSize={30} sx={{ color: 'custom.blue', height: '50vh' }}>Carregando...</Typography>}
                {error && <h1>{error}</h1>}
                {!loading && !error && !joke && <Typography fontWeight= 'fontWeightBold' fontSize={30} sx={{ color: 'custom.red', height: '50vh' }}>Nenhuma piada encontrada</Typography>}

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
            </Box>
        </ThemeProvider>
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