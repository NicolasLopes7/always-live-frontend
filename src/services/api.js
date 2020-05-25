import axios from 'axios';

const api = axios.create({
    baseURL: 'https://always-alive-api.herokuapp.com',
});

export default api;
