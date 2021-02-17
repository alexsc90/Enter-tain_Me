const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const serviceSchema = new Schema({
  name: {
    type: String,
    enum: ['infantil', 'público general']
  },
    users: [{type: Schema.Types.ObjectId, ref:'User'}]
});

const Service = model('Service', serviceSchema);
module.exports = Service