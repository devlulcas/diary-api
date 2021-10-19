<div align="center">
  <img src="https://img.shields.io/static/v1?label=Node&labelColor=24363C&message=JS&color=DFE2DF&logo=node.js&logoColor=DFE2DF&style=for-the-badge">
  <img src="https://img.shields.io/static/v1?label=EXPRESS&labelColor=24363C&message=JS&color=DFE2DF&logo=express&logoColor=DFE2DF&style=for-the-badge">
  <img src="https://img.shields.io/static/v1?label=dev&labelColor=24363C&message=nodemon&color=DFE2DF&logo=nodemon&logoColor=DFE2DF&style=for-the-badge">
  <img src="https://img.shields.io/static/v1?label=psql&labelColor=24363C&message=knexjs&color=DFE2DF&logo=postgresql&logoColor=DFE2DF&style=for-the-badge">
  <img src="https://img.shields.io/static/v1?label=V 1.0&labelColor=24363C&message=OK&color=FFAF0&logo=&logoColor=00000&style=for-the-badge">
</div>
<hr>
<h1 align="center">📖 DIARY API 📖</h1>

## Sobre

O objetivo desta API é se responsabilizar pelo login e cadastro do usuário na aplicação e também por guardar, acessar e atualizar os segredos por trás de uma parede de autenticação.

**Preste atenção as instruções de instalação e tenha calma pois o projeto está em andamento e mudanças capazes de quebrar o funcionamento podem ocorrer a qualquer momento**

## Executando localmente

Garanta que todos os pré requisitos estejam funcionando corretamente na sua máquina para que o restante do processo possa correr corretamente.

### Pré requisitos:

- NodeJS (Versão 14+)
- NPM
- GIT

### Passo a passo:

- Se deseja colaborar com o desenvolvimento deste projeto siga o procedimento para realizar um pull request (começando pelo fork do projeto)

- Se deseja apenas utilizar o código ou está trabalhando em criar um cliente para a API sinta-se a vontade para clonar o repositório. Para clonar o repositório utilize o comando:

```bash
git clone https://github.com/devlulcas/diary-api.git
```

- Entre no diretório raiz e execute o comando a seguir para instalar as dependências:

```bash
npm install
```

- Logue com o usuário postgres

```bash
psql -U postgres
```

- Crie uma tabela com o nome "my_secret_diary":

```sql
CREATE DATABASE my_secret_diary;
```

- Rodando as migrations:

```bash
npx knex migrate:latest
```

- Gerando a chave de assinatura dos tokens:

```bash
npm run secret
```

- Execute o comando a seguir para executar a API com o nodemon:

```bash
npm run dev
```

### SOBRE AS DEPENDÊNCIAS:

O projeto possui uma quantidade razoavel de dependências, mas a maioria é bem simples e padrão de um projeto express.

A maioria pode ser instalar apenas com o npm install, mas no caso do postgresql será necessário instalar em sua máquina e criar o banco manualmente.

### CRIANDO O BANCO PGSQL:

- Siga as instruções de instalação para o seu sistema operacional no site oficial do postgresql.
- Logue com o usuário postgres

```bash
psql -U postgres
```

- Crie uma tabela com o nome "my_secret_diary":

```sql
CREATE DATABASE my_secret_diary;
```

- Criando uma migration:

```bash
npx knex migrate:make nome_da_migration
```

- Rodando as migrations:

```bash
npx knex migrate:latest
```

- Criando novas seeds:

```bash
npx knex seed:make num_nome_da_seed
```

- Rodando as seeds:

```bash
npx knex seed:run
```

### Rotas:

- [ GET ] Raiz - Retorna informações úteis sobre o estado do servidor:

`/`

- [ POST ] Registo de usuário - Recebe informações de cadastro de usuário como nome de usuário, email, senha e confirmação dos termos e serviços em um json:

`/user/register`

- [ POST ] Entrada de usuário - Recebe informações de cadastro de usuário como nome de usuário e senha em um json.

`/user/login`

- [ PUT ] Atualização de usuário - Recebe nome de usuário, email e senha atual e um nome de usuário, email e senha novos em um json:

`/user/update`

- [ GET ] Leitura do diário - Realiza um fluxo de dados do arquivo de texto no backend para o frontend:

`/diary`

- [ PUT ] Escrita no diário - Realiza um fluxo de dados do campo de texto do frontend para o arquivo de texto no backend:

`/diary`

- [ GET ] Leitura de sussurro - Retorna um sussurro aleatório do banco de dados:

`/whisper`

- [ POST ] Criação de sussurro - Recebe uma mensagem curta e grava no banco de dados

`/whisper`

- [ GET ] Ver configuração do usuário - Retorna um json com configurações do usuário, como por exemplo um tema de cores

`/config`

- [ PUT ] Altera configuração do usuário - Recebe um json de configurações do usuário, não possuí rota POST pois uma configuração padrão já é criada juntamente com o perfil do usuário

`/config`
