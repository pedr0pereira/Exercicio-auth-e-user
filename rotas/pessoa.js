const express = require('express');
const router = express.Router();

const {
  createPessoa,
  listPessoas,
  viewPessoa,
  editPessoa,
  removePessoa
} = require('../controladores/pessoa');

// Método POST para criar uma pessoa
router.post('/pessoas', createPessoa);

// GET lista de pessoas
router.get('/pessoa/list', listPessoas);

// GET uma pessoa específica pelo ID
router.get('/pessoa/view/:id', viewPessoa);

// PUT
router.put('/pessoa/edit/:id', editPessoa);

// DELETE
router.delete('/pessoa/delete/:id', removePessoa);

module.exports = router;
