const mongodb = require('../db/connect');
const  ObjectId = require('mongodb').ObjectId;

const getData = async (req, res, next) => {
  const result = await mongodb.getDb().db('cse341-project2').collection('plant-collection').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getPlant = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341-project2')
    .collection('plant-collection')
    .find({ _id: userId })
      ;
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addPlant = async (req, res) => {
  const Plant = {
    commonName: req.body.commonName,
      localName: req.body.localName,
      family: req.body.family,
      genus: req.body.genus,
      isMedicinal: req.body.isMedicinal,
      flowerColor: req.body.flowerColor,
      isEdible: req.body.isEdible,
      scientificName: req.body.scientificName
  }
  try {
  const result = await mongodb.getDb().db('cse341-project2').collection('plant-collection').insertOne(Plant);
  res.status(201).json(result)
  } catch(err){
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
}


const remPlant = async (req, res) => {
  try{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-project2').collection('plant-collection').deleteOne({ 'commonName' : req.body.commonName} );
    res.status(200).json(result);
  } catch(err){
    res.status(500).json(err || 'Error while removing contact')
  }
};
const modifyPlant = async (req, res) => {
  try {
    const Plant = {
      commonName: req.body.commonName,
      localName: req.body.localName,
      family: req.body.family,
      genus: req.body.genus,
      isMedicinal: req.body.isMedicinal,
      flowerColor: req.body.flowerColor,
      isEdible: req.body.isEdible,
      scientificName: req.body.scientificName
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-project2').collection('plant-collection').updateOne({ _id: userId }, {$set: { isEdible: req.body.isEdible}});
    res.status(204).json(result);
} catch(err) {
  res.status(500).json(err || `Error While updating contact with Id ${userId}`)
}
}

module.exports = { getData, getPlant, addPlant, modifyPlant, remPlant };