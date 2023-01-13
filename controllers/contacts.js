const { response } = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getData = async (req, res, next) => {
  const result = await mongodb.getDb().db('cse341').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addContact = async (req, res, next) => {
  const Contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  try {
  const result = await mongodb.getDb().db('cse341').collection('contacts').insertOne(Contact);
  res.status(201).json(result)
  } catch(err){
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
}


const remContact = async (req, res, next) => {
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('cse341').collection('contacts').deleteOne({ _id: userId });
  res.status(200).json(result);
  } catch(err){
    res.status(500).json(err || 'Error while removing contact')
  }
};
const editContact = async (req, res, next) => {
  try {
  const Contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('cse341').collection('contacts').replaceOne({ _id: userId }, Contact);
  res.status(204).json(result);
} catch(err) {
  res.status(500).json(err || `Error While updating contact with Id ${userId}`)
}
}

module.exports = { getData, getContact, addContact, remContact, editContact };