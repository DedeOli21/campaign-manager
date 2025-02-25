# 🚀 Gerenciador de Campanhas - Backend (NestJS)

Este é o backend de um sistema para gerenciar campanhas publicitárias, desenvolvido com **NestJS** e **TypeORM**.

## 📋 **Requisitos**
Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 16 ou superior)
- **Yarn** (ou npm, caso prefira)
- **Docker e Docker Compose** (para rodar o banco de dados PostgreSQL)

---

## 🔧 **Instalação**
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/nome-do-repositorio.git


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

  Isso iniciará um contêiner PostgreSQL na porta 5432.

  Caso prefira rodar o banco localmente sem Docker, configure as credenciais no .env.


## ▶️ **Executando o Projeto**

1. ```yarn start:dev```


## 📖 **Documentação da API (Swagger)**
A API possui documentação interativa via Swagger.
Acesse após iniciar o projeto: 🔗 http://localhost:3000/api


## 📂 **Estrutura do Projeto**

```
 ┣ 📂 src
 ┃ ┣ 📂 campaign
 ┃ ┃ ┣ 📜 campaign.module.ts      # Módulo principal da campanha
 ┃ ┃ ┣ 📜 campaign.service.ts      # Serviço da campanha (regras de negócio)
 ┃ ┃ ┣ 📜 campaign.controller.ts   # Controlador da campanha (rotas da API)
 ┃ ┃ ┣ 📜 entities/campaign.entity.ts  # Modelo da entidade campanha
 ┃ ┃ ┣ 📜 dto/create-campaign.dto.ts   # DTO para criação de campanha
 ┃ ┃ ┣ 📜 dto/update-campaign.dto.ts   # DTO para atualização de campanha
 ┃ ┣ 📂 helpers
 ┃ ┃ ┣ 📜 date-validation.helper.ts   # Helper para validação de datas
 ┃ ┣ 📜 app.module.ts                 # Módulo raiz da aplicação
 ┣ 📜 .env.example                    # Exemplo de configuração do ambiente
 ┣ 📜 docker-compose.yml               # Configuração do banco via Docker
 ┣ 📜 README.md                        # Documentação do projeto
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
