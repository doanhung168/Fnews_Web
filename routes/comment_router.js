const express = require('express');
const router = express.Router();

const passport = require('passport')
require('../middlewares/passport')

const CommentController = require('../controller/CommentController')

const { UserUtility, Constraint } = require('../utlity')

router
    .put('/like', passport.authenticate(Constraint.JWT, { session: false }, null), CommentController.like)
    .put('/unlike', passport.authenticate(Constraint.JWT, { session: false }, null), CommentController.unlike)
    .get('/get-by-owner', CommentController.getByOwner)
    .get('/get-comment-to-show', CommentController.getCommentToShow)
    .put('/review-comment', passport.authenticate(Constraint.JWT, { session: false }, null), CommentController.reviewComment)
    .get('/', CommentController.get)
    .post('/', passport.authenticate(Constraint.JWT, { session: false }, null), CommentController.add)
    .put('/', passport.authenticate(Constraint.JWT, { session: false }, null), CommentController.update)
    .delete('/', passport.authenticate(Constraint.JWT, { session: false }, null), CommentController.delete)
    .get('/get-childrent-comment', CommentController.getChildrentComment )

module.exports = router