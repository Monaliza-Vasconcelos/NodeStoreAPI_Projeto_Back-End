const express = require('express');
const auth = require('../middleware/auth');
const CategoriaController = require('../controllers/CategoriaController');

const router = express.Router();
const Categoria = new CategoriaController();


router.get('/v1/category/search', Categoria.search);
router.get('/v1/category/:id', Categoria.buscarPorId);

//protegidas
router.post('/v1/category',auth, Categoria.create);
router.put('/v1/category/:id',auth, Categoria.upadate);
router.delete('/v1/category/:id',auth, Categoria.delete);



module.exports = router;