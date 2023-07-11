const express = require('express');
const router = express.Router();
const clinicalReportController = require('../controladores/clinicalReport');

router.post('/:personId/create', clinicalReportController.createClinicalReport);// POST
router.get('/:personId/list', clinicalReportController.listClinicalReports); // GET lista de reports
router.get('/:personId/view/:relatorioId', clinicalReportController.viewClinicalReport); // GET relatorio especifico
router.put('/:personId/update/:relatorioId', clinicalReportController.updateClinicalReport); // PUT
router.delete('/:personId/delete/:relatorioId', clinicalReportController.removeClinicalReport); // DELETE

module.exports = router;
