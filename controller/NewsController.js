const News = require('../model/NewsModel')
const UserController = require('./UserController')


const NewsController = {

    get: async (req, res) => {
        try {
            let { page, per_page, field, active } = req.query
            if (per_page == null) {
                per_page = 10
            }

            const skip = page * per_page
            let news;
            let totalItem;


            if (field) {

                if (active) {
                    totalItem = await News.countDocuments({ field, active })
                    news = await News.find({ field, active }).sort({ time: -1 }).skip(skip).limit(per_page)
                } else {
                    totalItem = await News.countDocuments({ field })
                    news = await News.find({ field }).sort({ time: -1 }).skip(skip).limit(per_page)
                }

            } else {

                if (active) {
                    totalItem = await News.countDocuments({ active })
                    news = await News.find().sort({ time: -1 }).skip(skip).limit(per_page)
                } else {
                    totalItem = await News.countDocuments()
                    news = await News.find().sort({ time: -1 }).skip(skip).limit(per_page)
                }

            }


            return res.json({
                success: true, message: null, data: {
                    totalItem,
                    news
                }
            })

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getAllNews: async (req, res) => {
        try {
            const news = await News.find().sort({ created_time: -1 })
            return res.json({ success: true, message: null, data: news })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getAllNews: async (req, res) => {
        try {
            if (req.query.reviewed == 'false') {
                const news = await News.find({ state: 0 }).sort({ created_time: -1 })
                console.log(news)
                return res.json({ success: true, message: null, data: news })
            }
            const news = await News.find().sort({ created_time: -1 })
            return res.json({ success: true, message: null, data: news })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getById: async (req, res) => {
        try {
            const news = await News.findOne({ _id: req.params.id }).populate(['field', 'author'])
            if (news) {
                return res.json({ success: true, message: null, data: news })
            } else {
                return res.json({ success: false, message: "Không tìm thấy bài viết hoặc bài viết đã bị xóa hoặc ẩn", data: null })
            }

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getMyNews: async (req, res) => {
        try {
            const news = await News.find({ author: req.user._id }).sort({created_time: -1})
            return res.json({ success: true, message: null, data: news })

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    add: async (req, res) => {
        try {
            const news = new News(req.body)
            news.author = req.user._id
            await news.save()
            const updated = await UserController.updateMedia(req.user._id, news._id)
            if (updated) {
                return res.json({ success: true, message: null, data: { id: news._id, title: news.title, field: news.field } })
            } else {
                return res.json({ success: false, message: "Xảy ra lỗi hệ thống", data: null })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            const news = await News.findByIdAndUpdate(req.body.id, req.body, { returnDocument: 'after' })
            return res.json({ success: true, message: null, data: { id: news._id, title: news.title } })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    delete: async (req, res) => {
        try {
            await News.findByIdAndUpdate(req.body._id, { active: false })
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    addReport: async (reportId, newsId) => {
        try {
            const news = await News.findOne({ _id: newsId })
            if (news) {
                news.reports.push(reportId)
                await news.save()
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    },

    hideNews: async (req, res) => {
        try {
            const news = await News.findById(req.body.id)
            if (news && req.user._id.equals(news.author)) {
                if (news.active) {
                    news.active = false
                } else {
                    news.active = true
                }
                await news.save()
                return res.json({ success: true, message: null, data: news })
            } else {
                return res.json({ success: false, message: "Không tìm thấy bài viết hoặc không có quyền để thay đổi", data: null })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    increaseView: async (req, res) => {
        try {
            const news = await News.findById(req.body.id)
            if (news) {
                news.view = news.view + 1;
                await news.save()
                return res.json({ success: true, message: null, data: news._id })
            } else {
                return res.json({ success: false, message: "Không tìm thấy bài viết", data: null })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getHighViewNews: async (req, res) => {
        try {
            if (req.query.limit) {
                const news = await News.find({active: true, state: 1}).sort({ view: 1 }).limit(req.query.limit)
                return res.json({ success: true, message: null, data: news })
            } else {
                const news = await News.find({active: true, state: 1}).sort({ view: 1 })
                return res.json({ success: true, message: null, data: news })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }





}

module.exports = NewsController