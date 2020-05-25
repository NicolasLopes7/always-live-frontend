import React, { useEffect, useState } from 'react';
import api from './services/api';
import Lottie from 'react-lottie';
import animationData from './assets/lf30_editor_IE4R4V.json';
import Wrapper from './components/Wrapper';
import Title from './components/Title/';
import Button from './components/Button';
import { Input } from './components/Input';
import QtdText from './components/QtdText';
import Swal from 'sweetalert2';

function App() {
    const [qtdSites, setQtdSites] = useState([]);
    const [url, setUrl] = useState(' ');
    const [deleteURL, setDeleteURL] = useState([]);
    const [deleteID, setDeleteID] = useState([]);

    const sendURL = async (url) => {
        const response = await api.post('/addSite', {
            url,
        });
        if (response.status < 400) {
            await updateQTD();
            Swal.fire({
                title: 'Site Added!',
                icon: 'success',
                html: `Save this token if you want to disable our service <strong>${response.data.id}</strong>`,
            });
        } else {
            Swal.fire({
                title: 'Error!',
                icon: 'error',
                html: 'Probably this site has already been registered!',
            });
        }
    };

    const updateQTD = async () => {
        const response = await api.get('/getQtd');
        await api.get('/pingToAll');
        setQtdSites(response.data.qtdSites);
    };
    useEffect(async () => {
        await updateQTD();
    }, []);

    useEffect(async () => {
        const interval = setInterval(async () => {
            const response = await api.get('/getQtd');
            setQtdSites(response.data.qtdSites);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            await api.get('/pingToAll');
        }, 900000);
        return () => clearInterval(interval);
    }, []);

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
    };

    return (
        <Wrapper>
            <Lottie
                options={lottieOptions}
                height={400}
                width={400}
                className="animation"
            />
            <Title>Alive Always Heroku</Title>

            <Input
                placeholder="Type the Heroku link"
                onChange={(event) => setUrl(event.target.value)}
            ></Input>

            <Button onClick={() => sendURL(url)}>Send</Button>
            <br />
            <QtdText>
                <b style={{ fontWeight: 'lighter' }}>
                    At this moment {qtdSites} sites are using{' '}
                </b>
                Alive Always Heroku
            </QtdText>
        </Wrapper>
    );
}

export default App;
