const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

const plantController = require('../controllers/plant');
const validation = require('../middleware/validate');

router.get('/', plantController.getData);
router.get('/:id', plantController.getPlant);
router.delete('/:id', plantController.remPlant);
router.post('/', validation.savePlant, plantController.addPlant);
router.put('/:id', validation.savePlant, plantController.modifyPlant);
router.get('/', plantController.getImage);

module.exports = router;