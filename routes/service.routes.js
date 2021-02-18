const {Router} = require('express');
const router = new Router();
const mongoose = require('mongoose');

const Service = require('../models/Service.model')
const fileUploader = require('../configs/cloudinary.config');

router.get('/servicios', (req, res, next) => {
  Service.find({})
  .then((services) => {
    res.render('services/list', {services})
  }).catch(error => {
    next(error)
  })
});

router.get('/servicios/agregar', (req, res, next) => {
  res.render('services/create')
});

router.post('/servicios/agregar', fileUploader.single('image'), (req, res, next) => {
  const {name, artist, area, public} = req.body;

  Service.create({
    name, artist, area, public, image: req.file.path
  }).then((service) => {
    res.redirect('/servicios')
  }).catch(error => {
    res.render('services/create')
  }) 
});

module.exports = router