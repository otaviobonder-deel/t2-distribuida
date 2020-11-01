import socketClient from 'socket.io-client';
import ss from 'socket.io-stream';
import chalk from 'chalk';
import fs from 'fs';
import Socketio from 'socket.io';
import { inquirerHelper } from './inquirerHelper.js';

ss.forceBase64 = true;

const log = console.log;

const io = new Socketio(3000, { serveClient: false });

io.on('connection', (socket) => {
    ss(socket).on('fileDownload', (stream, data) => {
        fs.createReadStream(`resources/${data.name}`).pipe(stream);
    });
});

export const downloadFile = ({ file, host }) => {
    log(chalk.yellow('Criando uma conexão socket com o outro client...'));
    const socket = socketClient(`http://${host}:3000`);
    socket.on('connect', () => {
        if (socket.connected) {
            log(chalk.green('Conexão estabelecida!'));
            log(
                chalk.yellow(
                    'Criando stream de comunicação e iniciando download do arquivo...'
                )
            );
            const stream = ss.createStream();
            ss(socket).emit('fileDownload', stream, { name: file });
            stream.pipe(fs.createWriteStream(`resources/${file}`));
            log(
                chalk.green(
                    'Arquivo baixado com sucesso e salvo na pasta resources'
                )
            );
            log(chalk.yellow('Encerrando conexão com o outro client...'));
            socket.close();
            log(chalk.green('Conexão encerrada!'));
            inquirerHelper();
        } else {
            log(chalk.red('Falha de conexão via socket'));
            inquirerHelper();
        }
    });
};
