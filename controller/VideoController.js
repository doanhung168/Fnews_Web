const Video = require('../model/VideoModel')

const VideoController = {

    get: async (req, res) => {
        try {
            let { page, per_page } = req.query
            if (per_page == null) {
                per_page = 10
            }

            const skip = page * per_page
            let videos;
            let totalItem;


            totalItem = await Video.count()
            videos = await Video.find({}).sort({ time: -1 }).skip(skip).limit(per_page)

            return res.json({ success: true, message: null, data: { totalItem, videos } })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    add: async (req, res) => {
        try {
            console.log(req.body)
            const video = Video(req.body)
            video.onwer = req.user._id
            await video.save()
            return res.json({ success: true, message: null, data: { id: video._id } })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            const video = await Video.findOneAndUpdate({ _id: req.body.id }, req.body, { returnDocument: 'after' })
            if (video) {
                return res.json({ success: true, message: null, data: video })
            } else {
                return res.json({ success: false, message: "Not Found", data: null })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    delete: async (req, res) => {
        try {
            const video = await Video.findOneAndUpdate({ _id: req.body.id }, { active: false }, { returnDocument: 'after' })
            if (video) {
                return res.json({ success: true, message: null, data: video })
            } else {
                return res.json({ success: false, message: "Not Found", data: null })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    addReport: async (reportId, videoId) => {
        try {
            const video = await Video.findOne({_id: videoId})
            if(video) {
                video.reports.push(reportId)
                await video.save()
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    }
}

module.exports = VideoController