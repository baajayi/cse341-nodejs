const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/', requiresAuth(), require('./swagger'));
router.use('/plant',  requiresAuth(), require('./plant'))
router.get('/',  requiresAuth(), (req, res) => {
    res.send('Welcome to the App, Use /plant to go to the plant in the url page')
})

module.exports = router;