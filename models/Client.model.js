const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const clientSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'El campo username debe ser llenado'],
    unique: true 
  },
  email: {
    type: String, 
    required: [true, 'El campo email debe ser llenado'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor usa un correo electrónico válido']
  },
  passwordHash: {
    type: String,
    required: [true, 'El campo password debe ser llenado']
  }
},
  {
    timestamps: true
  }
);

const Client = model('Client', clientSchema);
module.exports = Client