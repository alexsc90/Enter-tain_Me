const {Router} = require('express');
const router = new Router();
const mongoose = require('mongoose');

const User = require('../models/User.model');
const fileUploader = require('../configs/cloudinary.config');

router.get('/perfil', (req, res, next) => {
  console.log(req.session.currentUser)
  res.render('users/artist-profile', {userInSession: req.session.currentUser})
});

router.get('/perfil/actualizar/:id', (req, res, next) => {
  const {id} = req.params

  User.findById(id)
  .then((user) => {
    res.render('users/update-form', {user})
  }).catch(error => next(error))
});

router.post('/perfil/actualizar/:id', fileUploader.single('image'), (req, res, next) => {
  const {id} = req.params
  const {name, email, phoneNumber, area} = req.body;

  User.findByIdAndUpdate(id, {name, email, phoneNumber, image: req.file.path, area}, {new: true})
  .then((user) => {
    res.redirect("/perfil")
  }).catch(error => next(error))
});

router.post('/perfil/eliminar/:id', (req, res, next) => {
  const {id} = req.params

  User.findByIdAndDelete(id)
  .then(() => res.redirect('/inicio'))
  .catch(error => next(error))
});


module.exports = router