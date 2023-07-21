const express = require('express');
const router = express.Router();
const intercorrenciaController = require('../controladores/intercorrencia');

router.post('/:personId/create', intercorrenciaController.createIntercorrencia);// POST
router.get('/:personId/list', intercorrenciaController.listIntercorrencia); // GET lista de prescrições
router.get('/:personId/view/:intercorrenciaId', intercorrenciaController.viewIntercorrencia); // GET prescrição especifico
router.put('/:personId/update/:intercorrenciaId', intercorrenciaController.updateIntercorrencia); // PUT
router.delete('/:personId/delete/:intercorrenciaId', intercorrenciaController.removeIntercorrencia); // DELETE

module.exports = router;
