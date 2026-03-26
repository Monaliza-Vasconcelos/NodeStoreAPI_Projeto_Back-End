# 🚀 API REST com Node.js, Express e Sequelize

## 📌 Descrição

API REST desenvolvida para gerenciamento de usuários, categorias e produtos, utilizando autenticação com JWT e banco de dados relacional.

O projeto implementa operações completas de CRUD e controle de acesso através de rotas protegidas.

---

## 🛠️ Tecnologias utilizadas

* Node.js
* Express
* Sequelize
* MySQL
* JWT (JSON Web Token)
* bcrypt

---

## 🔐 Autenticação

A API utiliza autenticação via JWT.

Para acessar rotas protegidas, é necessário enviar o token no header:

Authorization: Bearer <token>

---

## 📚 Endpoints

### 👤 Usuários

* POST /v1/user → Criar usuário
* POST /v1/user/token → Gerar token
* GET /v1/user/:id → Buscar usuário por ID
* PUT /v1/user/:id → Atualizar usuário (🔒 protegido)
* DELETE /v1/user/:id → Deletar usuário (🔒 protegido)

---

### 📦 Produtos

* GET /v1/product/search
* GET /v1/product/:id
* POST /v1/product (🔒 protegido)
* PUT /v1/product/:id (🔒 protegido)
* DELETE /v1/product/:id (🔒 protegido)

---

### 🗂️ Categorias

* GET /v1/category/search
* GET /v1/category/:id
* POST /v1/category (🔒 protegido)
* PUT /v1/category/:id (🔒 protegido)
* DELETE /v1/category/:id (🔒 protegido)

---

## ⚙️ Como executar o projeto

1. Clonar o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Instalar dependências:
   ```bash
   npm install
   ```

3. Configurar variáveis de ambiente (.env):
   ```bash
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   JWT_SECRET=
   ```

4. Rodar o projeto:
   ```bash
   npm run dev
   ```

---

## 🧪 Testes

Os testes podem ser realizados utilizando o Insomnia ou Postman.

Fluxo básico:

1. Criar usuário
2. Gerar token
3. Utilizar token nas rotas protegidas

---

## 📌 Funcionalidades

✔ Cadastro de usuários com senha criptografada
✔ Autenticação com JWT
✔ CRUD completo de usuários, produtos e categorias
✔ Rotas protegidas com middleware de autenticação
✔ Validação de token

---

## 👩‍💻 Autor(a)

Monaliza Vasconcelos
