const Comment = require('../model/CommentModel')

const CommentController = {

    add: async (req, res) => {
        try {
            const { content, target, targe_type } = req.body
            const comment = new Comment({ content, target, owner: req.user._id, targe_type })
            await comment.save()
            return res.json({ success: true, message: null, data: comment._id })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getToShow: async (req, res) => {
        const comments = await Comment.find({state: 1, active: true}).sort({time: -1})
        return res.json({ success: true, message: null, data: comments })
    },

    get: async (req, res) => {
        try {
            const {state} = req.query
            if(state == 0) {
                const comments = await Comment.find({state: state}).sort({created_time: 1})
                return res.json({ success: true, message: null, data: comments })
            } else {
                const comments = await Comment.find().sort({created_time: 1})
                return res.json({ success: true, message: null, data: comments })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getByOwner: async (req, res) => {
        try {
            const {state} = req.query
            if(state == 0) {
                const comments = await Comment.find({state: state, owner: req.user._id}).sort({created_time: -1})
                return res.json({ success: true, message: null, data: comments })
            } else {
                const comments = await Comment.find({owner: req.user._id}).sort({created_time: -1})
                return res.json({ success: true, message: null, data: comments })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            const {id} = req.body
            const comment = await Comment.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
            return res.json({ success: true, message: null, data: comment })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    delete: async (req, res) => {
        try {
            const {id} = req.body
            await Comment.deleteOne({_id: id})
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }
}
module.exports = CommentController