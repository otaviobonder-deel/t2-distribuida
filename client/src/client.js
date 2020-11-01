import dotenv from 'dotenv/config.js';
import clear from 'clear';
import chalk from 'chalk';
import figlet from 'figlet';

import {
    heartbeat,
    registerClient,
} from './controllers/serverCommunication.js';
import { resources } from './controllers/files.js';
import { inquirerHelper } from './controllers/inquirerHelper.js';

clear();

const log = console.log;

log(
    chalk.yellow(
        figlet.textSync('Distribuida - Client', { horizontalLayout: 'full' })
    )
);

try {
    log(chalk.yellow('Criando hash dos arquivos da pasta resources...'));
    const hashes = await resources();
    log(chalk.green('Hashes criados!'));

    log(chalk.yellow('Registrando cliente com o servidor...'));
    await registerClient({ files: hashes });
    log(chalk.green('Registrado com sucesso no servidor!'));

    log(chalk.yellow('Registrando heartbeat'));
    setInterval(async () => {
        await heartbeat();
    }, 5000);
    log(chalk.green('Função heartbeat registrada com sucesso!'));
    await inquirerHelper();
} catch (e) {
    chalk.red(`Algo falou: ${e.message}`);
    process.exit(1);
}
