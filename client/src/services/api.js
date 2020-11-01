import axios from 'axios';

const api = axios.create({
    baseURL: `http://${process.env.BASE_IP}:8080/api`,
});

export default api;
