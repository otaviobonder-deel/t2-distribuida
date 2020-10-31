import chalk from 'chalk';
import api from '../services/api.js';

export const registerClient = async ({ files }) => {
    try {
        return await api.post('/register', {
            resources: files,
        });
    } catch (e) {
        console.log(chalk.red('Falha ao conectar no servidor'));
        process.exit(1);
    }
};

export const heartbeat = async () => {
    try {
        await api.patch('/live');
    } catch (e) {
        console.log(chalk.red('Falha ao conectar no servidor'));
        process.exit(1);
    }
};

export const getList = async () => {
    try {
        return api.get('/list');
    } catch (e) {
        console.log(chalk.red('Falha ao conectar no servidor'));
        process.exit(1);
    }
};
