const express = require('express');
const router = express.Router();
const { Constraint } = require('../utlity')

const passport = require('passport')
require('../middlewares/passport')

const ReportController = require('../controller/ReportController');

router
    .get('/', ReportController.get)
    .get('/report-not-yet-resolve', passport.authenticate(Constraint.JWT, { session: false }), ReportController.getReportNotYetResovle)
    .post('/', passport.authenticate(Constraint.JWT, { session: false }), ReportController.add)
    .put('/', passport.authenticate(Constraint.JWT, { session: false }), ReportController.update)
    .delete('/', passport.authenticate(Constraint.JWT, { session: false }), ReportController.delete)


module.exports = router;