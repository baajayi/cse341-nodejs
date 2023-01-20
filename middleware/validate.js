const validator = require('../helpers/validate.js');

const savePlant = (req, res, next) => {
  const validationRule = {
        commonName:'required|string',
        localName: 'required|string',
        family: 'required|string',
        genus:'required|string',
        isMedicinal: 'required|string',
        flowerColor: 'required|string',
        isEdible: 'required|string',
        scientificName:'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Something is wrong with the information supplied',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePlant
};