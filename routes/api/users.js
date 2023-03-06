const express = require('express');
const router = express.Router();
const {userController, _userController} = require("../../controller/user_controller")
const passport = require('passport')
require('../../middlewares/_passport')

router
    .post('/register', userController.register)
    .get('/autoLogin', passport.authenticate('jwt', {session: false}, null), userController.autoLogin)
    .post('/login', userController.login)
    .put('/updateInfo', passport.authenticate('jwt', {session: false}, null), userController.updateInfo)
    .post('/forgotPassword', userController.forgotPassword)
    .get('/resetPassword/:user_id/:token', _userController._resetPassword)
    .post('/resetPassword/:user_id/:token', userController.resetPassword)




module.exports = router;
