import express from 'express';
import moment from 'moment';
import {
    getList,
    registerPeer,
    updateLastAlive,
} from './controllers/resources.js';

const routes = express.Router();

routes.post('/register', (req, res) => {
    try {
        const ip = req.connection.remoteAddress;
        const { resources } = req.body;
        registerPeer({
            peerData: { ip, lastAlive: moment(), resources },
        });
        res.status(201).send({ updatedAt: moment() });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

routes.get('/list', (req, res) => {
    try {
        const list = getList();
        res.status(200).send(list);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

routes.patch('/live', (req, res) => {
    try {
        const ip = req.connection.remoteAddress;
        updateLastAlive({ ip });
        res.status(200).send({ updatedAt: moment() });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default routes;
