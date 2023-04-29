const express = require('express');
const router = express.Router();
const { Constraint } = require('../utlity')

const passport = require('passport')
require('../middlewares/passport')

const VideoController = require('../controller/VideoController');

router
    .get('/get-all-video', VideoController.getAllVideo)
    .put('/hide-or-show', passport.authenticate(Constraint.JWT, { session: false }), VideoController.showOrHideVideo)
    .get('/my-videos', passport.authenticate(Constraint.JWT, { session: false }), VideoController.myVideo)
    .get('/:id', VideoController.getVideoById)
    .get('/', VideoController.get)
    .post('/', passport.authenticate(Constraint.JWT, { session: false }), VideoController.add)
    .put('/review-video-through-news', passport.authenticate(Constraint.JWT, { session: false }), VideoController.reviewVideoThroughNews)
    .put('/', passport.authenticate(Constraint.JWT, { session: false }), VideoController.update)
    .delete('/', passport.authenticate(Constraint.JWT, { session: false }), VideoController.delete)


module.exports = router;