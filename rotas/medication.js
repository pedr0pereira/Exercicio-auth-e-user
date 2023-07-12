const express = require('express');
const router = express.Router();
const medicationPrescriptionController = require('../controladores/medication');

router.post('/:personId/create', medicationPrescriptionController.createMedicationPrescription);// POST
router.get('/:personId/list', medicationPrescriptionController.listMedicationPrescription); // GET lista de prescrições
router.get('/:personId/view/:prescricaoId', medicationPrescriptionController.viewMedicationPrescription); // GET prescrição especifico
router.put('/:personId/update/:prescricaoId', medicationPrescriptionController.updateMedicationPrescription); // PUT
router.delete('/:personId/delete/:prescricaoId', medicationPrescriptionController.removeMedicationPrescription); // DELETE

module.exports = router;
