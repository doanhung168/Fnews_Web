const Comment = require('../model/CommentModel')
const UserController = require('../controller/UserController')

const CommentController = {

    add: async (req, res) => {
        try {
            const { content, target, target_type } = req.body
            const comment = new Comment({ content, target, owner: req.user._id, target_type })
            await comment.save()
            return res.json({ success: true, message: null, data: comment._id })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getToShow: async (req, res) => {
        const comments = await Comment.find({ state: 1, active: true }).sort({ time: -1 })
        return res.json({ success: true, message: null, data: comments })
    },

    get: async (req, res) => {
        try {
            const { state } = req.query
            if (state == 0) {
                const comments = await Comment.find({ state: state }).sort({ created_time: 1 })
                return res.json({ success: true, message: null, data: comments })
            } else {
                const comments = await Comment.find().sort({ created_time: 1 })
                return res.json({ success: true, message: null, data: comments })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getByOwner: async (req, res) => {
        try {
            const { state } = req.query
            if (state == 0) {
                const comments = await Comment.find({ state: state, owner: req.user._id }).sort({ created_time: -1 })
                return res.json({ success: true, message: null, data: comments })
            } else {
                const comments = await Comment.find({ owner: req.user._id }).sort({ created_time: -1 })
                return res.json({ success: true, message: null, data: comments })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getCommentToShow: async (req, res) => {
        try {
            const { getType, target } = req.query
            console.log(getType)
            console.log(target)
            if (getType == 0) {
                const comments = await Comment.find({ state: 1, active: true, target: target }).populate('owner').sort({ like: -1 })
                return res.json({ success: true, message: null, data: comments })
            } else {
                const comments = await Comment.find({ state: 1, active: true, target: target }).populate('owner').sort({ created_time: -1 })
                return res.json({ success: true, message: null, data: comments })
            }
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.body
            const comment = await Comment.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
            return res.json({ success: true, message: null, data: comment })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    reviewComment: async (req, res) => {
        try {
            const { id, state } = req.body
            const comment = await Comment.findByIdAndUpdate(id, req.body, { returnDocument: 'after' })
            if (comment.target_type == 1) {
                if (state == 1) {
                    const parentComment = await Comment.findById(comment.target)
                    if (parentComment) {
                        parentComment.childrent_comment.push(comment._id)
                        await parentComment.save()
                    }
                } else {
                    const parentComment = await Comment.findById(comment.target)
                    if (parentComment) {
                        const parentComment = await Comment.findById(comment.target)
                        const index = parentComment.childrent_comment.indexOf(comment._id);
                        if (index !== -1) {
                            parentComment.childrent_comment.splice(index, 1);
                        }
                        await parentComment.save()
                    }
                }
            }
            return res.json({ success: true, message: null, data: comment })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.body
            await Comment.deleteOne({ _id: id })
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    like: async (req, res) => {
        try {
            const user_id = req.user._id
            const comment = await Comment.findById(req.body.comment_id)
            if (comment) {
                comment.like = comment.like + 1
                await comment.save()
                const result = await UserController.pushLikedComment(user_id, req.body.comment_id)
                if (result) {
                    return res.status(200).json({ success: true, message: null, data: comment.like })
                } else {
                    return res.status(300).json({ success: false, message: "Lỗi", data: null })
                }
            } else {
                return res.status(300).json({ success: false, message: "Không tìm thấy bình luận", data: null })
            }

        } catch (e) {
            return res.status(300).json({ success: false, message: e.message, data: null })
        }
    },

    unlike: async (req, res) => {
        try {
            const user_id = req.user._id
            const comment = await Comment.findById(req.body.comment_id)
            if (comment) {
                comment.like = comment.like - 1
                await comment.save()
                const result = await UserController.deleteLikedComment(user_id, req.body.comment_id)
                if (result) {
                    return res.json({ success: true, message: null, data: comment.like })
                } else {
                    return res.json({ success: false, message: "Lỗi", data: null })
                }
            } else {
                return res.json({ success: false, message: "Không tìm thấy bình luận", data: null })
            }

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    getChildrentComment: async (req, res) => {
        try {
            const { id } = req.query
            const comment = await Comment.findById(id).populate({path: 'childrent_comment', populate: {path: 'owner'}})
            const childrentComment = comment.childrent_comment
            return res.json({ success: true, message: null, data: childrentComment })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }
}
module.exports = CommentController