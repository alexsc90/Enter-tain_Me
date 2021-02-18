const {Router} = require('express');
const router = new Router();
const mongoose = require('mongoose');

const Service = require('../models/Service.model');
//const User = require('../models/User.model')

router.get('/servicios', (req, res, next) => {
  Service.find({})
    .then((services) => {
      res.render('services', {services})
      console.log(services)
    }).catch(error => {
        next(error)
    })
  
})

module.exports = router