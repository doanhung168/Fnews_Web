const express = require('express');
const router = express.Router();

const passport = require('passport')
require('../middlewares/passport')

const CommentController = require('../controller/CommentController')

const { UserUtility, Constraint } = require('../utlity')

router
    .get('/get-by-owner', CommentController.getByOwner)
    .get('/', CommentController.get)
    .post('/', passport.authenticate(Constraint.JWT, { session: false }, null), CommentController.add)
    .put('/', passport.authenticate(Constraint.JWT, { session: false }, null), CommentController.update)
    .delete('/', passport.authenticate(Constraint.JWT, { session: false }, null), CommentController.delete)

module.exports = router