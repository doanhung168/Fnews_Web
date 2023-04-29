const Video = require('../model/VideoModel')

const VideoController = {

    get: async (req, res) => {
        try {
            let { page, per_page, field } = req.query
            if (per_page == null) {
                per_page = 10
            }

            const skip = page * per_page
            let videos;
            let totalItem;


            totalItem = await Video.count({active: true, state: 1, field: field})
            videos = await Video.find({active: true, state: 1, field: field}).sort({ time: -1 }).skip(skip).limit(per_page)

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
    },

    myVideo: async (req, res) => {
        try {
            const videos = await Video.find({onwer: req.user._id}).sort({createdTime: -1})
            return res.json({ success: true, message: null, data: videos })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    showOrHideVideo : async(req, res) => {
        try {
            const video = await Video.findById(req.body.id)
            if (video && req.user._id.equals(video.onwer)) {
                if (video.active) {
                    video.active = false
                } else {
                    video.active = true
                }
                await video.save()
                return res.json({ success: true, message: null, data: video })
            } else {
                return res.json({ success: false, message: "Không tìm thấy bài viết hoặc không có quyền để thay đổi", data: null })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getAllVideo : async (req, res) => {
        try {
            if (req.query.state == 0) {
                const videos = await Video.find({state: 0}).sort({ created_time: -1 })
                return res.json({ success: true, message: null, data: videos })
            }
            const videos = await Video.find().sort({ created_time: -1 })
            return res.json({ success: true, message: null, data: videos })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getVideoById: async (req, res) => {
        try {
            const video = await Video.findById(req.params.id).populate(['onwer'])
            return res.json({ success: true, message: null, data: video })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    reviewVideoThroughNews: async (req, res) => {
        try {
            console.log(req.body)
            const videos = await Video.find({linkedNews: req.body.news_id})
            if(videos) {
                videos.forEach(async (video) => {
                    video.state = req.body.state,
                    video.stateExtra = req.body.stateExtra
                    await video.save()
                })
            }
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }


}

module.exports = VideoController