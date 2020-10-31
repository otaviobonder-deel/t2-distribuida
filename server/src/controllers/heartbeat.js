import { deletePeer, getList } from './resources.js';
import moment from 'moment';

export const heartbeat = () => {
    const data = getList();
    const clientsToDelete = [];

    // find all expired clients
    if (data.length > 0) {
        data.forEach((client) => {
            if (moment().isAfter(moment(client.lastAlive).add(10, 's'))) {
                clientsToDelete.push(client.ip);
            }
        });
    }

    // remove expired clients
    if (clientsToDelete.length > 0) {
        clientsToDelete.forEach((ip) => {
            deletePeer({ ip });
        });
    }
};
