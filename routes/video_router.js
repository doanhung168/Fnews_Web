const express = require('express');
const router = express.Router();
const {Constraint} = require('../utlity')

const passport = require('passport')
require('../middlewares/passport')

const VideoController = require('../controller/VideoController');

router
    .get('/', VideoController.get)
    .post('/', passport.authenticate(Constraint.JWT, {session: false}), VideoController.add)
    .put('/', VideoController.update)
    .delete('/', VideoController.delete)


module.exports = router;