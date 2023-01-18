const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/plant', require('./plant'))
router.get('/', (req, res) => {
    res.send('Welcome to the App, Use /plant to go to the plant in the url page')
})

module.exports = router;