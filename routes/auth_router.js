const express = require('express');
const router = express.Router();

const passport = require('passport')
require('../middlewares/passport')

const AuthController = require('../controller/AuthController')
const ViewController = require('../controller/ViewController')

const { UserUtility, Constraint } = require('../utlity')

router
    .get('/google-login', passport.authenticate(Constraint.GOOGLE, { scope: ['profile', 'email'] }))
    .get('/google-login-callback', passport.authenticate(Constraint.GOOGLE, { failureRedirect: '/login' }),
        UserUtility.checkAndAsignCookie, ViewController.toHome)

router
    .get('/facebook-login', passport.authenticate(Constraint.FACEBOOK))
    .get('/facebook-login-callback', passport.authenticate(Constraint.FACEBOOK, { failureRedirect: '/login' }),
        UserUtility.checkAndAsignCookie, ViewController.toHome)


router
    .post('/register', AuthController.register)
    .post('/auto-login', passport.authenticate(Constraint.JWT, { session: false }, null), AuthController.autoLogin)
    .post('/login', AuthController.login)
    .post('/forgot-password', AuthController.forgotPassword)
    .post('/reset-password/:user_id/:token', AuthController.resetPassword)

module.exports = router