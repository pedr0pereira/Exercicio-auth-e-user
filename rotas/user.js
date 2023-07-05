const express = require('express');
const router = express.Router();
const UserController = require('../controladores/user');

router.put('/edit/:id', UserController.edit);
router.put('/edit/email/:id', UserController.updateEmail);

module.exports = router;
