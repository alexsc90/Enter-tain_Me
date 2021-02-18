const {Router} = require('express');
const router = new Router();
const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User.model');
const fileUploader = require('../configs/cloudinary.config');

router.get('/registrarse', (req, res) => {
  res.render('auth/signup')
});

router.post('/registrarse', fileUploader.single('image'), (req, res, next) => {
  const {name, email, password, phoneNumber, service, description} = req.body;
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
        name, email, passwordHash, phoneNumber, image: req.file.path, service, description, rol: 'servidor'
      })
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/inicio');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
           errorMessage: 'Nombre de usuario y corre electrónico tienen que ser únicos'
        });
      } else {
        next(error);
      }
    });
})

router.post('/inicio', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('home', {
      errorMessage: 'Por favor ingresa ambos, email y password para iniciar sesión.'
    });
    return;
  }
  User.findOne({ email }) // <== check if there's user with the provided email
        .then(user => {
          if (!user) {
            res.render('home', {
              errorMessage: 'Email no registrado.'
            });
            return;
          }
          else if (bcryptjs.compareSync(password, user.passwordHash)) {
            
            req.session.currentUser = user;
            if(user.rol === 'servidor') {
              res.redirect('/perfil');
            } else {
              res.redirect('/usuarios')
            }

          } else {
            res.render('home', { errorMessage: 'Contraseña incorrecta.' });
          }
        })
        .catch(error => next(error));
});

router.get('/perfil', (req, res, next) => {
  res.render('users/user-profile', {userInSession: req.session.currentUser})
    console.log(userInSession)
})

router.get('/usuarios', (req, res, next) => {
  res.render('users/client-profile', {userInSession: req.session.currentUser})
})

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/inicio')
})

module.exports = router