
require('dotenv').config();
const express = require('express');
const userRotas = require('../src/routes/user_routers')
const rotasCategorias = require('../src/routes/rotas_categoria')
const rotasProdutos = require('../src/routes/rotas_produtos')
const rotasAuth = require('../src/routes/rotas_auth')
const app = express();


app.get('/', (req, res) => {
  res.send('API funcionando');

});
app.use(express.json());
app.use(rotasAuth);
app.use(userRotas);
app.use(rotasCategorias);
app.use(rotasProdutos);


module.exports = app;