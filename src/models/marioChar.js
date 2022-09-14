const mongoose = require('mongoose');

//  Your code goes here

mongoose.connect("mongodb://localhost/testaroo")
const marioSchema = new mongoose.Schema({
    name: String, 
    weight: Number
},{versionKey:false})

const marioModel = mongoose.model('testaroo', marioSchema);


module.exports = marioModel;
