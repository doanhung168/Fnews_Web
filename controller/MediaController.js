const Media = require('../model/MediaModel')
const UserController = require('../controller/UserController')


const MediaController = {

    get: async (req, res) => {
        try {
            let { page, per_page, field, type } = req.query
            if (per_page == null) {
                per_page = 10
            }

            const skip = page * per_page
            let medias;
            let totalItem;

            if(type && type === 'news') {
                if(field) {
                    totalItem = await Media.countDocuments({ field: field, type: 'news' })
                    medias = await Media.find({ field: field, type: 'news' }).skip(skip).limit(per_page)
                } else {
                    totalItem = await Media.countDocuments({ type: 'news' })
                    medias = await Media.find({ type: 'news' }).skip(skip).limit(per_page)
                }
            } else if(type && type === 'video') {
                totalItem = await Media.countDocuments({ type: 'video' })
                medias = await Media.find({ type: 'video' }).skip(skip).limit(per_page)
            } else {
                if(field) {
                    totalItem = await Media.countDocuments({ field })
                    medias = await Media.find({ field }).skip(skip).limit(per_page)
                } else {
                    totalItem = await Media.countDocuments()
                    medias = await Media.find().skip(skip).limit(per_page)
                }
            }
            
            return res.json({
                success: true, message: null, data: {
                    totalItem,
                    medias
                }
            })

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    add: async (req, res) => {
        try {
            const media = new Media(req.body)
            media.author = req.user._id
            await media.save()
            const updated = await UserController.updateMedia(req.user._id, media._id)
            if (updated) {
                return res.json({ success: true, message: null, data: null })
            } else {
                return res.json({ success: false, message: "Xảy ra lỗi hệ thống", data: null })
            }

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            const media = await Media.findByIdAndUpdate(req.body._id, req.body, { returnDocument: 'after' })
            return res.json({ success: true, message: null, data: media })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    delete: async (req, res) => {
        try {
            await Media.findByIdAndUpdate(req.body._id, { active: false })
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }

}

module.exports = MediaController