const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/', requiresAuth(), require('./swagger'));
router.use('/plant',  requiresAuth(), require('./plant'))
router.use('/image',  requiresAuth(), require('./image'))
router.get('/',  requiresAuth(), (req, res) => {
    res.send('Welcome to the App, Use /plant or /image to go to the desired page')
})

module.exports = router;