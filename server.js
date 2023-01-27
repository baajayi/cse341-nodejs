const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const routes = require('./routes');
const cors = require('cors');
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };


app.use(bodyParser.json())
.use(cors())
    .use(express.json())
    .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      next();
})
.use(auth(config))
.use('/', routes);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

  const db = require('./models');
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      app.listen(port, () => {
        console.log(`DB Connected and server running on ${port}.`);
      });
    })
    .catch((err) => {
      console.log('Cannot connect to the database!', err);
      process.exit();
    });
