const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const routes = require('./routes');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json())
    .use(express.json())
    .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      next();
})
.use('/', routes);

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
