# 🚀 Gerenciador de Campanhas - Backend (NestJS)

Este é o backend de um sistema para gerenciar campanhas publicitárias, desenvolvido com **NestJS** e **TypeORM**.

## 📋 **Requisitos**
Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 20 ou superior)
- **NestJs** (versão 20 ou superior)
- **Yarn**
- **Docker**

---

## 🔧 **Instalação**
1. Clone o repositório:
   ```sh
   git clone https://github.com/DedeOli21/campaign-manager.git


2. Acesse a pasta do projeto:
```
  cd nome-do-repositorio

  yarn install
```

## 🛠️ **Configuração**
1. Copie o arquivo de exemplo .env.example e renomeie para .env
  ```
  cp .env.example .env
  ```

2. Edite o arquivo .env com suas credenciais, por exemplo
```
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_USER=user
  DATABASE_PASSWORD=password
  DATABASE_NAME=campaigns_db
```

3. Subindo o Banco de Dados com Docker
Para rodar o banco de dados PostgreSQL via Docker, execute:
  docker-compose up -d

  Isso iniciará um contêiner PostgreSQL na porta 5432 e a API na porta 3000.

## ▶️ **Executando o Projeto**

1. ```yarn start:dev```


## 📖 **Documentação da API (Swagger)**
A API possui documentação interativa via Swagger.
Acesse após iniciar o projeto: 🔗 http://localhost:3000/api


## 📂 **Estrutura do Projeto**

```
 📦 src
┣ 📂 application
┃ ┣ 📂 usecases
┃ ┃ ┣ 📂 campaign
┃ ┃ ┃ ┣ 📜 campaign.module.ts          # Módulo de casos de uso da campanha
┃ ┃ ┃ ┣ 📜 create-campaign.use-case.ts # Caso de uso para criar uma campanha
┃ ┃ ┃ ┣ 📜 delete-campaign.use-case.ts # Caso de uso para deletar uma campanha
┃ ┃ ┃ ┣ 📜 find-campaign.use-case.ts   # Caso de uso para buscar uma campanha
┃ ┃ ┃ ┣ 📜 list-campaign.use-case.ts   # Caso de uso para listar campanhas
┃ ┃ ┃ ┗ 📜 update-campaign.use-case.ts # Caso de uso para atualizar uma campanha
┃ ┃ ┗ 📜 application.module.ts         # Módulo principal da camada de aplicação
┣ 📂 domain
┃ ┣ 📂 entities
┃ ┃ ┗ 📜 campaign.entity.ts            # Entidade da campanha (modelo de dados)
┃ ┗ 📂 repositories
┃ ┃ ┗ 📜 campaign.repository.ts        # Repositório de campanha (interface)
┣ 📂 infra
┃ ┣ 📂 database
┃ ┃ ┣ 📜 campaign.repository.ts        # Implementação do repositório de campanha
┃ ┃ ┗ 📜 database.module.ts            # Configuração do banco de dados
┃ ┗ 📂 dto
┃ ┃ ┣ 📜 response-create.dto.ts        # DTO para resposta de criação
┃ ┃ ┣ 📜 response-delete.dto.ts        # DTO para resposta de deleção
┃ ┃ ┣ 📜 response-find.dto.ts          # DTO para resposta de busca
┃ ┃ ┗ 📜 response-list.dto.ts          # DTO para resposta de listagem
┣ 📂 presentation
┃ ┣ 📂 campaign
┃ ┃ ┣ 📂 dto
┃ ┃ ┃ ┣ 📜 create-campaign.dto.ts      # DTO para criar uma campanha
┃ ┃ ┃ ┣ 📜 delete-campaign.dto.ts      # DTO para deletar uma campanha
┃ ┃ ┃ ┣ 📜 find-campaign.dto.ts        # DTO para buscar uma campanha
┃ ┃ ┃ ┗ 📜 update-campaign.dto.ts      # DTO para atualizar uma campanha
┃ ┃ ┗ 📜 campaign.module.ts            # Módulo da camada de apresentação da campanha
┃ ┣ 📂 controller
┃ ┃ ┗ 📜 campaign.controller.ts        # Controlador da campanha (endpoints REST)
┃ ┗ 📜 presentation.module.ts          # Módulo principal da camada de apresentação
┣ 📂 shared
┃ ┣ 📂 const
┃ ┃ ┗ 📜 status-campaign.ts            # Constantes relacionadas ao status da campanha
┃ ┣ 📂 databases
┃ ┃ ┗ 📜 campaign.ts                   # Configuração de conexão com banco
┃ ┣ 📂 helpers
┃ ┃ ┗ 📜 verify-date.helper.ts         # Helper para verificação de datas
┃ ┗ 📂 swagger
┃ ┃ ┣ 📜 internal-server-error.swagger.ts # Definição do erro 500 no Swagger
┃ ┃ ┗ 📜 not-found.swagger.ts          # Definição do erro 404 no Swagger
┣ 📜 app.module.ts                     # Módulo raiz da aplicação
┣ 📜 main.ts                            # Arquivo de bootstrap do NestJS
┣ 📜 swagger.ts                         # Configuração do Swagger para documentação da API
┣ 📜 .env.example                       # Exemplo do arquivo de configuração do ambiente
┣ 📜 docker-compose.yml                  # Configuração do banco via Docker
┣ 📜 README.md                           # Documentação do projeto
```

## 🚀 Endpoints Principais
| Método |	Rota |	Descrição |
| --------- | :--------: | --------- |
| GET	| /campaigns	 |  Lista todas as campanhas |
| POST | 	/campaigns	 |  Cria uma nova campanha
| GET	| /campaigns/:id	 |  Obtém detalhes de uma campanha |
| PUT	| /campaigns/:id	 |  Atualiza uma campanha |
| DELETE |	/campaigns/:id	 |  Remove (soft delete) uma campanha |



## 🛠 Tecnologias Utilizadas
1. NestJS - Framework para Node.js
2. TypeScript - Tipagem estática para JavaScript
3. TypeORM - ORM para banco de dados
4. PostgreSQL - Banco de dados relacional
5. Docker - Contêinerização do banco de dados
6. Swagger - Documentação interativa da API
7. Jest - Testes unitários e de integração

## 🛠 Rodando Testes
 Para rodar os testes unitários:

```yarn test```

Para rodar os testes de integração:

```yarn test:e2e```


## 📜 Licença
Este projeto está licenciado sob a MIT License.

---

## **📌 O que este README inclui?**
✅ **Passos claros para rodar o projeto**\
✅ **Configuração do ambiente com Docker**\
✅ **Comandos para rodar o backend e os testes**\
✅ **Explicação dos principais endpoints**\
✅ **Descrição das tecnologias usadas**\
✅ **Estrutura organizada do projeto**\
✅ **Link para documentação do Swagger**\
