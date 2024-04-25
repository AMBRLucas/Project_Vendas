const express = require('express');
const router = express.Router();

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const adsController = require('./controllers/adsController');

const Auth = require('./middleware/auth');

const AuthValidator = require("./validators/AuthValidator");
const UserValidator = require('./validators/UserValidator');

router.get('/ping', (req, res)=>{
    res.json({pong: true});
});

router.get('/states', userController.getStates);

router.post('/user/singin', AuthValidator.singIn, authController.singIn);
router.post('/user/singup', AuthValidator.singUp, authController.singUp);

router.get('/user/me', Auth.private, userController.info);
router.put('/user/me', UserValidator.editAction, Auth.private, userController.editAction);

router.get('/categories', adsController.getCategories);

router.post('/ad/add', Auth.private, adsController.addAction);
router.get('/ad/list', adsController.getList);
router.get('/ads/item', adsController.getItem);
router.post('/ad/:id', Auth.private, adsController.editAction);


module.exports = router;