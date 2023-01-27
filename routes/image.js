const express = require('express');
const router = express.Router();

const imageController = require('../controllers/image');
const validation = require('../middleware/validate');

router.get('/', imageController.getAll);
router.get('/:id',imageController.getImage);
router.delete('/:id', imageController.remImage);
router.post('/', validation.savePlant, imageController.addImage);
router.put('/:id', validation.savePlant, imageController.changeImage);

module.exports = router;