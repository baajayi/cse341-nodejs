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
  try {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Unable to find a plant with that Id.');
    return;
  }
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
}catch(err){
    res.status(500).json(result.error || 'Some error occurred while adding the plant.');
    return;
  }
};

const addPlant = async (req, res) => {
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
  
  const result = await mongodb.getDb().db('cse341-project2').collection('plant-collection').insertOne(Plant);
  res.status(201).json(result)
  } catch(err){
    res.status(500).json(result.error || 'Some error occurred while adding the plant.');
    return;
  }
}


const remPlant = async (req, res) => {
  try{
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Unable to find a plant with that Id');
    return;
  }
    const plantId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-project2').collection('plant-collection').deleteOne({ _id: plantId } );
    res.status(200).json(result);
  } catch(err){
    res.status(500).json(err || 'Error while removing plant');
    return;
  }
};

const modifyPlant = async (req, res) => {
   try {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Unable to find a plant with that Id');
    return;
  }
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
    const plantId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-project2').collection('plant-collection').updateOne({ _id: plantId }, {$set: { isEdible: req.body.isEdible}});
    res.status(204).json(result);
} catch(err) {
  res.status(500).json(err || `Error While updating plant with Id ${plantId}`)
  return;
}
}

module.exports = { getData, getPlant, addPlant, modifyPlant, remPlant };