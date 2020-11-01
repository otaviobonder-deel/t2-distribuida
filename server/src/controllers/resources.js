import moment from 'moment';

const data = [];

export const registerPeer = ({ peerData }) => {
    data.push({ ...peerData });
    return data;
};

export const getList = () => {
    return data;
};

// get by hash
export const getResource = ({ name }) => {
    const resourceLocations = [];
    data.forEach((client) => {
        const foundResource = client.resources.find(
            (cr) => cr.content === hash
        );
        if (foundResource) {
            resourceLocations.push(foundResource.ip);
        }
    });
    return resourceLocations;
};

export const deletePeer = ({ ip }) => {
    const peer = data.findIndex((resource) => resource.ip === ip);
    if (peer > -1) {
        data.splice(peer, 1);
        console.log(
            `Cliente com ip ${ip} excluído, pois não enviou heartbeat há mais de 10 segundos.`
        );
    }
    return data;
};

export const updateLastAlive = ({ ip }) => {
    const peer = data.findIndex((resource) => resource.ip === ip);
    if (peer > -1) {
        data[peer].lastAlive = moment();
    }
    return peer;
};
