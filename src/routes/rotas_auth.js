const express = require('express');
const auth = require('../controllers/AuthControlller');

const router = express.Router();
const authC  = new auth();

router.post('/v1/user/token', authC.token);

module.exports = router;