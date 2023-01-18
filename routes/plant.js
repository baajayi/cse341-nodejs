const express = require('express');
const router = express.Router();

const plantController = require('../controllers/plant');

router.get('/', plantController.getData);
router.get('/:id', plantController.getPlant);
router.delete('/:id', plantController.remPlant);
router.post('/', plantController.addPlant);
router.put('/:id', plantController.modifyPlant);

module.exports = router;