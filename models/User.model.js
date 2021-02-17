const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'El campo nombre de usuario debe ser llenado'],
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
    required: [true, 'El campo contraseña debe ser llenado']
  },
  phoneNumber: Number,
  image: String,
  service: {
    type: String,
    enum: ['infantil', 'público general'] 
  },
  description: String
},
  {
  timestamps: true
  }
);

const User = model('User', userSchema);
module.exports = User;