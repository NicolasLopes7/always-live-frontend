import React, { useEffect, useState } from 'react';
import api from './services/api';

function App() {
    const [qtdSites, setQtdSites] = useState([]);

    useEffect(async () => {
        const response = api.get('/getQtd');
        setQtdSites(response.data.qtdSites);
    }, []);

    return (
        <div className="App">
            <span>{qtdSites}</span>
        </div>
    );
}

export default App;
