const mongodb = require('../db/connect');
const  ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('cse341-project2').collection('image').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getImage = async (req, res) => {
  try {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Unable to find a plant with that image Id.');
    return;
  }
  const imageId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341-project2')
    .collection('image')
    .find({ _id: imageId })
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

const addImage = async (req, res) => {
  try {
  const plantImage = {
    commonName: req.body.commonName,
      image: req.body.image
  }
  
  const result = await mongodb.getDb().db('cse341-project2').collection('image').insertOne(plantImage);
  res.status(201).json(result)
  } catch(err){
    res.status(500).json(result.error || 'Some error occurred while adding the plant.');
    return;
  }
}


const remImage = async (req, res) => {
  try{
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Unable to find a plant with that Image Id');
    return;
  }
    const imageId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-project2').collection('image').deleteOne({ _id: imageId } );
    res.status(200).json(result);
  } catch(err){
    res.status(500).json(err || 'Error while removing plant');
    return;
  }
};

const changeImage = async (req, res) => {
   try {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Unable to find a plant with that Id');
    return;
  }
  const plantImage = {
    commonName: req.body.commonName,
      image: req.body.image
  }
  
    const imageId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-project2').collection('image').updateOne({ _id: imageId }, {$set: { image: req.body.image}});
    res.status(204).json(result);
} catch(err) {
  res.status(500).json(err || `Error While updating plant with Id ${imageId}`)
  return;
}
}

module.exports = { getImage, getAll, addImage, changeImage, remImage };