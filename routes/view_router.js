const express = require('express');
const router = express.Router();

const passport = require('passport')
require('../middlewares/passport')

const ViewController = require('../controller/ViewController')
const { Constraint } = require('../utlity')


router
    .get('/login', ViewController.login)
    .get('/create-news', ViewController.createNews)
    .get('/forgot-password', ViewController.forgotPassword)
    .get('/register', ViewController.register)
    .get('/reset-password/:user_id/:token', ViewController.resetPassword)
    .get('/profile', ViewController.profile)
    .get('/my-news', ViewController.myNews)
    .get('/field-management', ViewController.fieldManagement)
    .get('/news-management', ViewController.newsManagement)
    .get('/news-edit/:id', ViewController.editNews)
    .get('/news-view/:id', ViewController.viewNews)
    .get('/news-review/:id', ViewController.reviewNews)
    .get('/my-videos', ViewController.myVideos)
    .get('/video-management', ViewController.videoManagement)
    .get('/video-review/:id', ViewController.reviewVideo)
    .get('/comment-manager', ViewController.commentManagement)
    .get('/', ViewController.home)

module.exports = router