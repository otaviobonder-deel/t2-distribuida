# Readme
## Como rodar este projeto

Este projeto foi elaborado utilizando NodeJS. Portanto, para rodar é necessário ter o node instalado no computador. **Importante**, este projeto necessita a versão do NodeJS superior a 14.4.0. Para verificar sua versão, execute o seguinte comando:

```
$ node -v
```

Caso a versão seja inferior a 14.4.0, siga os passos disponíveis aqui: https://nodejs.org/en/

## Como rodar o servidor
Para rodar o servidor, basta entrar na pasta do servidor e executar:

```
$ npm install
```

Após instalar as dependências necessárias, basta executar:

```
$ npm start
```

O servidor será executado e estará escutando na porta 5000.

## Como rodar os clientes
Para rodar os clientes, basta entrar na pasta `client` e editar o arquivo .env, substituindo o IP constante no arquivo pelo IP do servidor.

**Importante**, cada cliente deve ser executado em uma VM ou máquina diferente. Dois clientes não podem executar na mesma máquina ou VM, nem em uma máquina que já esteja executando o servidor.

Após, basta instalar as dependências do projeto:

```
$ npm install
```

E iniciar o cliente:

```
$ npm start
```
