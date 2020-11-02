import socketClient from 'socket.io-client';
import chalk from 'chalk';
import fs from 'fs';
import Socketio from 'socket.io';
import { inquirerHelper } from './inquirerHelper.js';

const log = console.log;

const io = new Socketio(3000, { serveClient: false });

io.on('connect', (ss) => {
    ss.on('fileDownload', (file) => {
        const fileReaded = fs.readFileSync(`resources/${file}`);
        const base64File = new Buffer(fileReaded).toString('base64');
        io.emit('file', base64File);
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
            socket.emit('fileDownload', file);
        } else {
            log(chalk.red('Falha de conexão via socket'));
            inquirerHelper();
        }
    });
    socket.on('file', (data) => {
        const buff = Buffer.from(data, 'base64');
        fs.writeFileSync(`resources/${file}`, buff, { flag: 'w' });
        log(
            chalk.green(
                'Arquivo baixado com sucesso e salvo na pasta resources'
            )
        );
        log(chalk.yellow('Encerrando conexão com o outro client...'));
        socket.close();
        log(chalk.green('Conexão encerrada!'));
        inquirerHelper();
    });
};
