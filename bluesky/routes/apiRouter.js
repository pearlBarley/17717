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
router.post('/login', apiController.account.login);
router.post('/logout', apiController.account.logout);
router.post('/signup', apiController.account.signup);
router.post('/createPost', apiController.post.createPost);
router.get('/getHomePosts', apiController.post.getHomePosts);
router.get('/getpostDetail', apiController.post.getpostDetail);
router.post('/votePost', apiController.post.votePost);
router.post('/addComment', apiController.comment.addComment);

module.exports = router;