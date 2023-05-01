const express = require('express');
const router = express.Router();

const passport = require('passport')
require('../middlewares/passport')

const UserController = require('../controller/UserController')
const { Constraint } = require('../utlity')

router
    .get('/user-roll', passport.authenticate(Constraint.JWT, { session: false }), UserController.getRoll)
    .get('/user-data', passport.authenticate(Constraint.JWT, { session: false }), UserController.getUserData)
    .put('/updateInfo', passport.authenticate(Constraint.JWT, { session: false }), UserController.updateInfo)
    .get('/liked-comments', passport.authenticate(Constraint.JWT, { session: false }), UserController.getLikedCommentByReq)
    .put('/seen-news', passport.authenticate(Constraint.JWT, { session: false }), UserController.pushSeenNews)
    .put('/saved-news', passport.authenticate(Constraint.JWT, { session: false }), UserController.savedNews)
    .get('/saved-news', passport.authenticate(Constraint.JWT, { session: false }), UserController.getSavedNews)

module.exports = router;
