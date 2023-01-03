const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Hey, Promise Igbojionu');
});

module.exports = routes