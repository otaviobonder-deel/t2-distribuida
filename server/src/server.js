import express from 'express';
import routes from './routes.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
