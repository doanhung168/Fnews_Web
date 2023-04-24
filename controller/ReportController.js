const Report = require('../model/ReportModel')
const NewsController = require('../controller/NewsController')
const VideoController = require('../controller/VideoController')


const ReportController = {
    add: async (req, res) => {
        try {
            const report = new Report(req.body);
            await report.save()

            const type = req.body.type
            if (type === "news") {
                await NewsController.addReport(report._id, req.body.owner)
                return res.json({ success: true, message: null, data: report })
            } else {
                await VideoController.addReport(report._id, req.body.owner)
                return res.json({ success: true, message: null, data: report })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    get: async (req, res) => {
        try {
            if (req.query.owner) {
                const reports = await Report.find({ owner: req.body.owner }).sort({ time: -1 })
                return res.json({ success: true, message: null, data: reports })
            } else {
                const reports = await Report.find().sort({ time: -1 })
                return res.json({ success: true, message: null, data: reports })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getReportNotYetResovle: async (req, res) => {
        try {
            const reports = await Report.find({ resovle: false }).sort({ time: -1 })
            return res.json({ success: true, message: null, data: reports })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            await Report.findOneAndUpdate({ _id: req.body.id }, req.body)
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    delete: async (req, res) => {
        try {
            await Report.findOneAndDelete({ _id: req.body.id })
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },
}

module.exports = ReportController