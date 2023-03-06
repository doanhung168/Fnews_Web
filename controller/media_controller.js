const Media = require('../model/media')


const mediaController = {

    getMedias: async (req, res) => {
        try {
            let {page, per_page, field} = req.query
            const totalItem = Media.countDocuments({field})

            if (per_page == null) {
                per_page = 10
            }

            const skip = page * per_page
            const medias = Media.find().skip(skip).limit(per_page)

            return res.json({
                success: true, message: null, data: {
                    totalItem,
                    medias
                }
            })

        } catch (e) {
            return res.json({success: false, message: e.message, data: null})
        }
    },

    getMedia: async (req, res) => {
        try {
            const media = await Media.findById({_id: req.params.id})
            if (media) {
                return res.json({success: true, message: null, data: media})
            } else {
                return res.json({success: false, message: "Không tìm thấy tin này!", data: null})
            }
        } catch (e) {
            return res.json({success: false, message: e.message, data: null})
        }
    },

    addMedia: async (req, res) => {
        try {
            const media = new Media(req.body)
            await media.save()
            return res.json({success: true, message: null, data: media})
        } catch (e) {
            return res.json({success: false, message: e.message, data: null})
        }
    },

    editMedia: async (req, res) => {
        try {
            const media = await Media.findByIdAndUpdate(req.body._id, req.body, {returnDocument: 'after'})
            return res.json({success: true, message: null, data: media})
        } catch (e) {
            return res.json({success: false, message: e.message, data: null})
        }
    },

    deleteMedia: async (req, res) => {
        try {
            await Media.findByIdAndUpdate(req.body._id, {active: false})
            return res.json({success: true, message: null, data: null})
        } catch (e) {
            return res.json({success: false, message: e.message, data: null})
        }
    },

}

const _mediaController = {}

module.exports = {mediaController, _mediaController}

