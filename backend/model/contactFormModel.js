const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  Name:{
    type: String,
    required: true
  },
  Email:{
    type: String,
    required: true
  },
  Phone:{
    type: Number,
    required: true
  },
  DOB:{
    type: Date,
    required: true
  },
  Message:{
    type: String,
    required: true
  }
})

const formDataModel = mongoose.model('contactFormData', schema);
module.exports = formDataModel;