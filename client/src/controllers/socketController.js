import socketClient from 'socket.io-client';
import ss from 'socket.io-stream';
import chalk from 'chalk';
import fs from 'fs';
import Socketio from 'socket.io';

const log = console.log;

const io = new Socketio(3000, { serveClient: false });

io.on('connection', (socket) => {
    log(chalk.green(socket));
    ss(socket).on('fileDownload', (stream, data) => {
        stream.pipe(fs.createReadStream(`resources/${data.name}`));
    });
});

export const downloadFile = ({ file, host }) => {
    log(chalk.yellow('Criando uma conexão socket com o outro client...'));
    const socket = socketClient.connect(`${host}:3000`);
    log(chalk.green('Conexão estabelecida!'));
    log(
        chalk.yellow(
            'Criando stream de comunicação e iniciando download do arquivo...'
        )
    );
    const stream = ss.createStream();
    ss(socket).emit('fileDownload', stream, { name: file });
    stream.pipe(fs.createWriteStream(`resources/${file}`));
    log(chalk.green('Arquivo baixado com sucesso e salvo na pasta resources'));
};
