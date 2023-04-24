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

module.exports = router;
