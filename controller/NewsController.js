const News = require('../model/NewsModel')
const UserController = require('./UserController')


const NewsController = {

    get: async (req, res) => {
        try {
            let { page, per_page, field } = req.query
            if (per_page == null) {
                per_page = 10
            }

            const skip = page * per_page
            let news;
            let totalItem;

            if(type && type === 'news') {
                if(field) {
                    totalItem = await News.countDocuments({ field: field, type: 'news' })
                    news = await News.find({ field: field, type: 'news' }).sort({time : -1}).skip(skip).limit(per_page)
                } else {
                    totalItem = await News.countDocuments({ type: 'news' })
                    news = await News.find({ type: 'news' }).sort({time : -1}).skip(skip).limit(per_page)
                }
            } else {
                if(field) {
                    totalItem = await News.countDocuments({ field })
                    news = await News.find({ field }).sort({time : -1}).skip(skip).limit(per_page)
                } else {
                    totalItem = await News.countDocuments()
                    news = await News.find().sort({time : -1}).skip(skip).limit(per_page)
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

    add: async (req, res) => {
        try {
            const news = new News(req.body)
            news.author = req.user._id
            await news.save()
            const updated = await UserController.updateMedia(req.user._id, news._id)
            if (updated) {
                return res.json({ success: true, message: null, data: {id: news._id, title: news.title}})
            } else {
                return res.json({ success: false, message: "Xảy ra lỗi hệ thống", data: null })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            const news = await News.findByIdAndUpdate(req.body._id, req.body, { returnDocument: 'after' })
            return res.json({ success: true, message: null, data: news })
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
    }

}

module.exports = NewsController