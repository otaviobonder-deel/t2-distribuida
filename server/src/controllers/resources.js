import moment from 'moment';

const data = [];

export const registerPeer = ({ peerData }) => {
    data.push({ peerData });
    return data;
};

export const getPeerResourcesByIp = ({ ip }) => {
    return data.find((resource) => resource.ip === ip);
};

export const deletePeer = ({ ip }) => {
    const peer = data.findIndex((resource) => resource.ip === ip);
    if (peer > -1) {
        data.splice(peer, 1);
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
