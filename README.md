
# Projeto de CRUD de Pacientes - Medcloud

Este projeto é um sistema de gerenciamento de pacientes, desenvolvido com Next.js no frontend, integrado com uma infraestrutura de backend serverless usando AWS API Gateway, Cognito, DynamoDB e Lambda. O sistema permite a criação, leitura, atualização e exclusão (CRUD) de pacientes. O frontend foi construído utilizando React Query para o gerenciamento de dados assíncronos, Axios para as requisições HTTP, Material UI para a interface do usuário e Yup para a validação de formulários.


## Funcionalidades

O sistema de gerenciamento de pacientes inclui as seguintes funcionalidades:

- Listagem de pacientes: Visualizar todos os pacientes cadastrados.
- Paginação de pacientes: paginação na listagem de pacientes. (Limite 5 por página)
- Adição de paciente: Cadastrar novos pacientes.
- Visualização do paciente: Visualizar informações detalhadas de um paciente.
- Edição do paciente: Atualizar as informações do paciente.
- Exclusão do paciente: Deletar pacientes do sistema.


## Tecnologias utilizadas

### Frontend

- Next.js: Framework React para renderização no lado do servidor (SSR) e geração estática de sites (SSG.
- React Query: Biblioteca para gerenciamento de estados de dados assíncronos, usada para buscar, armazenar em cache e sincronizar dados de maneira eficiente.
- Axios: Cliente HTTP baseado em Promises para realizar chamadas à API.
- Material UI: Biblioteca de componentes de interface de usuário React, com design moderno e responsivo.
- Yup: Biblioteca para validação de esquemas de dados, usada na validação dos formulários de cadastro e edição de pacientes.

### Backend

- AWS API Gateway: Gerenciador de rotas de API RESTful, utilizado para expor as funções Lambda como serviços HTTP.
- AWS Cognito: Serviço de autenticação e autorização de usuários.
- AWS DynamoDB: Banco de dados NoSQL, utilizado para armazenar as informações dos pacientes.
- AWS Lambda: Funções serverless, usadas para implementar a lógica de negócios do backend (CRUD).
## Instalação

Siga os passsos abaixo para executar o projeto localmente

### Pré requistos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Configurações das credenciais da AWS CLI (para interação com os serviços da AWS) 

### 1. Clone do repositório

```bash
  git clone https://github.com/devJonatasAssis/medcloud-frontend.git
```

### 2. Acesse o diretório do projeto: 

```bash
  cd medcloud-frontend
```

### 2. Instale as dependências: 

```bash
  yarn install
```
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`NEXT_PUBLIC_API_URL='https://2lw7ahgm4f.execute-api.us-east-1.amazonaws.com/'`

`NEXT_PUBLIC_COGNITO_USER_POOL_ID='us-east-1_FOZTf6VPD'`

`NEXT_PUBLIC_COGNITO_CLIENT_ID='qt3e7kd5rb3cgjlojkkpuabiv'`


## Executando o projeto

Execute o servidor de desenvolvimento:

```bash
  npm run dev
```

Ou com yarn:

```bash
  yarn run dev
```
## Rodando os testes

Foi utilizado o playwright para os testes e2e, que testa todos os fluxos da aplicação. O Playwright é uma ferramenta incrível para automação de navegadores desenvolvida pela Microsoft. Ele te ajuda a automatizar interações com páginas da web e a criar testes de ponta a ponta para garantir que tudo está funcionando como esperado no seu app. E o melhor: funciona com os principais navegadores (Chromium, Firefox e WebKit), o que significa que você pode testar sua aplicação em múltiplos ambientes!

```bash
  yarn run test:e2e
```

## Deploy

A aplicação está hospedada na Vercel usando a versão gratuita, assim como também todos os recursos da AWS estão no modo Free Tier, não gerando nenhum custo até o momento.

URL da aplicação: `medcloud-frontend-lac.vercel.app`

## Uso da aplicação

Foi criado um usuário no Cognito: 

`Email: devjonatasassis@gmail.com`

`Senha: @Teste1234`

A aplicação tem uma única rota além da HOME que é a de pacientes `URL/pacientes` e essa rota está privada, você só conseguirá acessar ela através do Login feito por email e senha na primeira página.  

## Autores

- [@devjonatasassis](https://www.github.com/devjonatasassis)

