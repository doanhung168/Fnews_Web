const express = require('express');
const router = express.Router();
const { Constraint } = require('../utlity')

const passport = require('passport')
require('../middlewares/passport')

const NewsController = require('../controller/NewsController');

router
    .get('/my-news', passport.authenticate(Constraint.JWT, { session: false }), NewsController.getMyNews)
    .get('/:id', NewsController.getById)
    .get('/', NewsController.get)
    .post('/', passport.authenticate(Constraint.JWT, { session: false }), NewsController.add)
    .put('/', passport.authenticate(Constraint.JWT, { session: false }), NewsController.update)
    .put('/hideNews', passport.authenticate(Constraint.JWT, { session: false }), NewsController.hideNews)
    .delete('/', passport.authenticate(Constraint.JWT, { session: false }), NewsController.delete)


module.exports = router;