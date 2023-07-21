const express = require('express');
const router = express.Router();
const { register, login } = require('../controladores/auth');

// Rota de registro de usuário
router.post('/register', register);

// Rota de autenticação de usuário
router.post('/login', login);

module.exports = router;
