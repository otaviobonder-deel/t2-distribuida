import inquirer from 'inquirer';
import { getList } from './serverCommunication.js';
import chalk from 'chalk';

export const inquirerHelper = async () => {
    const answers = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Escolha a opção desejada:',
        choices: [
            { name: 'Solicitar lista de recursor', value: 'list' },
            { name: 'Transferir recurso de outro peer', value: 'download' },
            { name: 'Finalizar cliente', value: 'exit' },
        ],
    });
    switch (answers.action) {
        case 'list':
            const { data } = await getList();
            console.log(chalk.yellow('Arquivos indexados pelo servidor:'));
            data.forEach((file) => console.log(chalk.green(file)));
            await inquirerHelper();
            break;
        case 'exit':
            console.log(chalk.green('Finalizando cliente!'));
            process.exit(0);
    }
};
