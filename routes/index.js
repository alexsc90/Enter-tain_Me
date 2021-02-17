const {Router} = require('express');
const router  = new Router();
const mongoose = require('mongoose')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/inicio', (req, res, next) => {
  res.render('home')
})

module.exports = router;
