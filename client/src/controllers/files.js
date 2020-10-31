import hashFunc from 'folder-hash';
import fs from 'fs';

export const resources = async () => {
    const files = fs.readdirSync('resources');
    const hashes = [];

    for (const file of files) {
        const hash = await hashFunc.hashElement(file, 'resources');
        hashes.push({ name: hash.name, content: hash.hash });
    }

    return hashes;
};
