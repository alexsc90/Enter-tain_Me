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
  rol: {
    type: String,
    enum: ['cliente', 'artista']
  },
  phoneNumber: Number,
  image: {
    type: String,
    default: 'images/logo.png'
  },
  area: String
},
  {
  timestamps: true
  }
);

const User = model('User', userSchema);
module.exports = User;