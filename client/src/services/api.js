import axios from 'axios';

const api = axios.create({
    baseURL: `http://${process.env.BASE_IP}:5000/api`,
});

export default api;
