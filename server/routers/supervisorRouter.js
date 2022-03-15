const express = require('express');
const router = express.Router();
const supervisorController = require('../controllers/supervisorController');

router.get('/', supervisorController.getSupervisor);
router.post('/', supervisorController.createSupervisor);
router.put('/:id', supervisorController.updateSupervisor);
router.delete('/:id', supervisorController.deleteSupervisor);

module.exports = router;
