const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'))
router.get('/', (req, res) => {
    res.send('Welcome to the App, Use /contacts to go to the contact in the url page')
})

module.exports = router;