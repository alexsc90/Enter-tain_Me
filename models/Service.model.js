const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const serviceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Ingresa el nombre del servicio a ofrecer.']
  },
  artist: {
    type: String,
    required: [true, 'Ingresa tu nombre de usuario']
  },
  image: String,
  area: String, 
  public: String
});

const Service = model('Service', serviceSchema);
module.exports = Service