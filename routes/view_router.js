const express = require('express');
const router = express.Router();

const passport = require('passport')
require('../middlewares/passport')

const ViewController = require('../controller/ViewController')
const { Constraint } = require('../utlity')


router
    .get('/login', ViewController.login)
    .get('/comp-create-news', ViewController.compCreateNews)
    .get('/forgot-password', ViewController.forgotPassword)
    .get('/register', ViewController.register)
    .get('/reset-password/:user_id/:token', ViewController.resetPassword)
    .get('/profile', ViewController.profile)
    .get('/my-news', ViewController.myNews)
    .get('/', ViewController.home)

module.exports = router