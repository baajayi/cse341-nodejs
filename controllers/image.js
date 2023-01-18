const db = require('../models/image');
const PlantImage = db.plantimage;

exports.getPlantImg = (req, res) => {
  const commonName = req.params.commonName;
  PlantImage.find({ commonName: commonName })
    .then((data) => {
      if (!data) res.status(404).send({ message: 'Plant with common name' + commonName + 'not found'});
      else res.send(data[0])
    })
}