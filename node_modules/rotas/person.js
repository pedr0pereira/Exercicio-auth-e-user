const express = require('express');
const router = express.Router();
const PessoaController = require('../controladores/person');

router.post('/pessoa/create', PessoaController.createPerson); // POST
router.get('/pessoa/list', PessoaController.listPerson); // GET lista de pessoas
router.get('/pessoa/view/:id', PessoaController.viewPerson); // GET pessoa específica pelo ID
router.put('/pessoa/edit/:id', PessoaController.editPerson); // PUT
router.delete('/pessoa/delete/:id', PessoaController.removePerson); // DELETE

module.exports = router;
