import inquirer from 'inquirer';
import { getList } from './serverCommunication.js';
import chalk from 'chalk';
import { downloadFile } from './socketController.js';

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
            data.forEach((d) => {
                console.log(
                    chalk.yellow(
                        `O cliente ${d.ip} possui os seguintes arquivos:`
                    )
                );
                d.resources.forEach((resource) => {
                    console.log(
                        chalk.green(
                            `${resource.name} que possui o seguinte hash: ${resource.content}`
                        )
                    );
                });
            });
            inquirerHelper();
            break;
        case 'download':
            await downloadInquirer();
            break;
        case 'exit':
            console.log(chalk.green('Finalizando cliente!'));
            process.exit(0);
    }
};

const downloadInquirer = async () => {
    const { data } = await getList();

    const client = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Selecione de qual cliente deseja baixar um arquivo:',
        choices: data.map((client) => client.ip),
    });

    const file = await inquirer.prompt({
        type: 'list',
        name: 'file',
        message: 'Selecione o arquivo que deseja baixar:',
        choices: data.find((c) => c.ip === client.action).resources,
    });
    downloadFile({ file: file.file, host: client.action });
};
