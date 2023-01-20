const express = require('express');
const router = express.Router();

const plantController = require('../controllers/plant');
const validation = require('../middleware/validate');

router.get('/', plantController.getData);
router.get('/:id', plantController.getPlant);
router.delete('/:id', plantController.remPlant);
router.post('/', validation.savePlant, plantController.addPlant);
router.put('/:id', validation.savePlant, plantController.modifyPlant);

module.exports = router;