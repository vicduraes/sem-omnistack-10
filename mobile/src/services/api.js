import axios from 'axios';

const api = axios.create({
    // baseURL == IP do dispositivo ou localhost, caso use um emulador
    baseURL: 'http://192.168.0.8:3333',
});

export default api;