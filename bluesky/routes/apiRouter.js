var express = require('express');
var router = express.Router();

const apiController = require('../controllers/api');

// router.get('/aaa', function(req, res) {
//   res.json({a:1});

// });

// router.get('/bbb', function (req, res) {
//   res.send('Hello World!');
// });

router.post('/login', apiController.login);
router.post('/signup', apiController.signup);


module.exports = router;