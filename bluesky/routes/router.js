var express = require('express');
var router = express.Router();

const homeController = require('../controllers/home');
// const userController = require('../controllers/user');
const apiController = require('../controllers/api');
// const contactController = require('../controllers/contact');

/**
 * Primary app routes.
 */
router.get('/', homeController.index);
router.get('/room/:roomID', homeController.enterRoom);

/**
 * API examples routes.
 */
// router.get('/api', apiController.getApi);


// router.post('/deleteApkInfo', loginRequired, apkinfo.deleteApkInfo);
// function ifAuthenticated(req, res, next) {
//     if(req.session.isAuthenticated) {
//         res.send({statuscode: 'alreadylogedin', detail: 'user already loged in', name: req.session.user.name});
//     } else {
//         next();
//     }
// }

// function loginRequired(req, res, next) {
//     if(req.session.isAuthenticated) {
//         next();
//     } else {
//         res.send({statuscode: 'loginRequired', detail: 'user does not loged in'});
//     }
// }


module.exports = router;