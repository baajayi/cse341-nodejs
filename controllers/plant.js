const db = require('../models/plant');
const Plant = db.plant;

exports.create = async (req, res) => {
    const plant = await new Plant(req.body);
    try {
    plant.save().then((data) => {
        console.log(data);
        res.status(201).send(data);
    })
 } catch(err){
        res.status(500).send({
            message: err.message || 'Plant cannot be added due to some errors'
        })
    }

}
exports.getAll = (req, res) => {
    try {
        Plant.find({}).then((data) => {
            res.send(data);
    })
} catch(err) {
    res.status(500).send({
        message: err.message || 'Error occured while getting plants'
    });
}};

exports.getPlant = (req, res) => {
    const commonName = req.params.commonName;
    try {
        Plant.find({ commonName: commonName}).then((data) => {
        res.send(data);
    })
} catch(err) {
    res.status(500).send({
        message: err.message || 'Error occured while getting plant'
    });
}};

exports.remPlant = (req, res) => {
    const commonName = req.params.commonName;
    try {
        Plant.remove( { commonName: commonName} ).then((data) => {
        res.send(data);
    })
} catch(err) {
    res.status(500).send({
        message: err.message || 'Cannot delete plant'
    });
}};

exports.editPlant = (req, res) => {
    const commonName = req.params.commonName;
    try {
        Plant.updateOne({ commonName: commonName}).then((data) => {
        res.send(data);
    })
} catch(err) {
    res.status(500).send({
        message: err.message || 'Cannot modify plant'
    });
}};