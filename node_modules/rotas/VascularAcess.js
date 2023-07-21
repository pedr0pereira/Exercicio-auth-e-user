const express = require('express');
const router = express.Router();
const vascularAcessController = require('../controladores/VascularAcess');

router.post('/:personId/create', vascularAcessController.createVascularAcess);// POST
router.get('/:personId/list', vascularAcessController.listVascularAcess); // GET lista dos acessos vasculares
router.get('/:personId/view/:acessosVascularesId', vascularAcessController.viewVascularAcess); // GET acesso vascular especifico
router.put('/:personId/update/:acessosVascularesId', vascularAcessController.updateVascularAcess); // PUT
router.delete('/:personId/delete/:acessosVascularesId', vascularAcessController.removeVascularAcess); // DELETE

module.exports = router;
