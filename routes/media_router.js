const express = require('express');
const router = express.Router();
const {Constraint} = require('../utlity')

const passport = require('passport')
require('../middlewares/passport')

const MediaController = require('../controller/MediaController');

router
    .get('/', MediaController.get)
    .post('/', passport.authenticate(Constraint.JWT, {session: false}), MediaController.add)
    .put('/', MediaController.update)
    .delete('/', MediaController.delete)


module.exports = router;