const {Router} = require('express');
const router = new Router();
const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User.model');


router.post('/registrarse-cliente', (req, res, next) => {
  const {name, email, password} = req.body;
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if(!regex.test(password)) {
    res.status(500).render('auth/signup', {errorMessage: 'La contraseña debe de cumplir con más de 6 caracteres, contener al menos un número, una minúscula y una mayúscula.'})
    return
  }

  if(!name || !email || !password) {
    res.render('auth/signup', {errorMessage: 'Los campos nombre, email y contraseña son requeridos'});
    return
  }
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(passwordHash => {
      return User.create({
        name, email, passwordHash, rol: 'cliente'
      })
    })
    .then(user => {
      console.log('Newly created user is: ', user);
      res.redirect('/inicio');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
           errorMessage: 'Nombre y corre electrónico tienen que ser únicos, intenta con otro.'
        });
      } else {
        next(error);
      }
    });
});

router.get('/usuarios', (req, res, next) => {
  User.find({rol: 'artista'})
    .then((users) => {
      console.log(users)
      res.render('users/list', {users, userInSession: req.session.currentUser})
    }).catch(error => {
      next(error)
    })
});

module.exports = router