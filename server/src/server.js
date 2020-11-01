import express from 'express';
import routes from './routes.js';
import { heartbeat } from './controllers/heartbeat.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// register heartbeat
setInterval(() => {
    heartbeat();
}, 5000);

app.listen(PORT, '0.0.0.0', () =>
    console.log(`🚀 Server running on port ${PORT}`)
);
