var express = require('express');
var router = express.Router();

const apiController = require('../controllers/api');

const authMW = require('../middlewares/auth.js');

// router.get('/aaa', function(req, res) {
//   res.json({a:1});

// });

// router.get('/bbb', function (req, res) {
//   res.send('Hello World!');
// });
router.get('/test', authMW.loginAuth)
router.post('/login', apiController.login);
router.post('/logout', apiController.logout);
router.post('/signup', apiController.signup);


module.exports = router;