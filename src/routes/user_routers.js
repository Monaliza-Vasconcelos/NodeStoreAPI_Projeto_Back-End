// routes/UserRotas.js
const auth = require('../middleware/auth');
const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();
const userController = new UserController();

router.get('/v1/user/:id',userController.buscarPorId);
router.post('/v1/user', userController.create);

//protegidas
router.put('/v1/user/:id',auth, userController.update);
router.delete('/v1/user/:id',auth, userController.delete);

module.exports = router;