import express from 'express';
import moment from 'moment';
import { getPeerResourcesByIp, registerPeer } from './controllers/resources.js';

const routes = express.Router();

routes.post('/register', async (req, res) => {
    try {
        const ip = req.connection.remoteAddress;
        const { resources } = req.body;
        registerPeer({ ip, lastAlive: moment(), resources });
        res.status(201).send({ updatedAt: moment() });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

routes.get('/:type/:resource/list', async (req, res) => {
    try {
        const { type, resource } = req.params.type;
        let list;
        switch (type) {
            case 'ip':
                list = getPeerResourcesByIp({ ip: resource });
                break;
        }
        res.status(200).send(list);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default routes;
