const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getData);
router.get('/:id', contactsController.getContact);
router.delete('/:id', contactsController.remContact);
router.post('/', contactsController.addContact);
router.put('/:id', contactsController.editContact);

module.exports = router;