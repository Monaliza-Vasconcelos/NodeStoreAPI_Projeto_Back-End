const express = require('express');
const auth = require('../middleware/auth');
const ProdutosController = require('../controllers/ProdutosController');


const router = express.Router();
const Produtos = new ProdutosController();


router.get('/v1/product/search', Produtos.search);
router.get('/v1/product/:id', Produtos.buscarPorId);

//protegidas
router.post('/v1/product',auth, Produtos.create);
router.put('/v1/product/:id',auth, Produtos.upadate);
router.delete('/v1/product/:id',auth, Produtos.delete);


module.exports = router;