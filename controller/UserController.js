const User = require("../model/UserModel")

const UserController = {

    getUserData: async (req, res) => {
        try {
            const user = req.user
            return res.json({ success: true, message: null, data: { id: user._id, display_name: user.display_name, avatar: user.avatar, email: user.email } })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    updateInfo: async (req, res) => {
        try {
            const user = await User.findOne({ display_name: req.body.display_name })
            if (user) {
                return res.json({ success: false, message: "Tên này đã tồn tại trong hệ thống", data: null })
            } else {
                const result = await User.findByIdAndUpdate(req.user._id, {
                    display_name: req.body.display_name,
                    avatar: req.body.avatar
                }, { returnDocument: 'after' })
                return res.json({
                    success: true,
                    message: null,
                    data: { display_name: result.display_name, avatar: result.avatar }
                })
            }

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    updateMedia: async (userId, mediaId) => {
        try {
            const user = await User.findById(userId)
            if (user) {
                user.my_media.unshift(mediaId)
                await user.save()
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }
}

module.exports = UserController