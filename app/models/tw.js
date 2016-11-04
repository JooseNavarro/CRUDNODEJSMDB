'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const twSchema = new Schema({
  nombre: String,
  texto: String
},{collections: 'tw'});

module.exports = mongoose.model('tw', twSchema);
