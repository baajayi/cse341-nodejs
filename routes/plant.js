const express = require('express');
const router = express.Router();

const plantController = require('../controllers/plant');

router.get('/', plantController.getAll);
router.get('/:id', plantController.getPlant);
router.delete('/:id', plantController.remPlant);
router.post('/', plantController.create);
router.put('/:id', plantController.editPlant);

module.exports = router;