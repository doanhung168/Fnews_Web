const express = require('express');
const router = express.Router();
const { Constraint } = require('../utlity')

const passport = require('passport')
require('../middlewares/passport')

const FieldControler = require('../controller/FieldController');

router
    .get('/', FieldControler.get)
    .post('/', passport.authenticate(Constraint.JWT, { session: false }), FieldControler.add)
    .put('/', passport.authenticate(Constraint.JWT, { session: false }), FieldControler.update)
    .put('/hideField', passport.authenticate(Constraint.JWT, { session: false }), FieldControler.hideField)
    .delete('/', passport.authenticate(Constraint.JWT, { session: false }), FieldControler.delete)

module.exports = router;