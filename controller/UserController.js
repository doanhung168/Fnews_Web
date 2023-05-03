const User = require("../model/UserModel")

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function moveElementToTop(arr, element) {
    var index = arr.indexOf(element);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    arr.unshift(element);
    return arr;
}

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
    },

    pushSeenNews: async (req, res) => {
        try {
            const news_id = req.body.newsId
            const user = req.user
            const seenNews = user.seen_news
            const newSeenNews = moveElementToTop(seenNews, news_id)
            user.seen_news = newSeenNews
            await user.save()
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    pushLikedComment: async (userId, commenId) => {
        try {
            const user = await User.findById(userId)
            if (user) {
                var index = user.liked_comment.indexOf(commenId);
                if (index > -1) {
                    return true
                } else {
                    user.liked_comment.push(commenId)
                    await user.save()
                    return true
                }
            } else {
                console.log("Không tìm thấy người dùng")
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }

    },

    deleteLikedComment: async (userId, commentId) => {
        try {
            const user = await User.findById(userId)
            if (user) {
                user.liked_comment = removeItemOnce(user.liked_comment, commentId)
                await user.save()
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
    },

    getLikedComment: async (userId) => {
        try {
            const user = await User.findById(userId)
            if (user) {
                return user.liked_comment
            } else {
                return null
            }
        } catch (e) {
            console.log(e)
            return null
        }

    },

    getLikedCommentByReq: async (req, res) => {
        try {
            const user = await User.findById(req.user._id)
            if (user) {
                return res.json({ success: true, message: null, data: user.liked_comment })
            } else {
                return res.json({ success: false, message: "Không tìm thấy người dùng", data: null })
            }
        } catch (e) {
            console.log(e)
            return res.json({ success: false, message: e.message, data: null })
        }
    },



    getRoll: async (req, res) => {
        return res.json({ success: true, message: null, data: { roll: req.user.roll } })
    },

    savedNews: async (req, res) => {
        const user = req.user
        console.log(req.body)
        if (req.body.saved == 'true') {
            const index = user.saved_news.indexOf(req.body.news_id)
            if (index !== -1) {
                user.saved_news.splice(index, 1)
            }
            user.saved_news.unshift(req.body.news_id)
            await user.save()
            return res.json({ success: true, message: null, data: true })
        } else {
            const index = user.saved_news.indexOf(req.body.news_id)
            if (index !== -1) {
                user.saved_news.splice(index, 1)
            }
            await user.save()
            return res.json({ success: true, message: null, data: false })
        }
    },

    getSavedNews: async (req, res) => {
        const user = req.user
        if (req.query.news_id) {
            const result = user.saved_news.includes(req.query.news_id)
            return res.json({ success: true, message: null, data: result})
        } else {
            return res.json({ success: true, message: null, data: user.saved_news })
        }
    },

    savedVideo : async (req, res) => {
        const user = req.user
        console.log(req.body)
        if (req.body.saved == 'true') {
            const index = user.saved_video.indexOf(req.body.video_id)
            if (index !== -1) {
                user.saved_video.splice(index, 1)
            }
            user.saved_video.unshift(req.body.video_id)
            await user.save()
            return res.json({ success: true, message: null, data: true })
        } else {
            const index = user.saved_video.indexOf(req.body.video_id)
            if (index !== -1) {
                user.saved_video.splice(index, 1)
            }
            await user.save()
            return res.json({ success: true, message: null, data: false })
        }
    },

    getSavedVideo: async (req, res) => {
        const user = req.user
        if (req.query.video_id) {
            const result = user.saved_video.includes(req.query.video_id)
            return res.json({ success: true, message: null, data: result})
        } else {
            return res.json({ success: true, message: null, data: user.saved_video })
        }
    },

    seenVideo: async (req, res) => {
        try {
            console.log(req.body)
            const videoId = req.body.videoId
            const user = req.user
            const seenVideo = user.seen_video
            const newSeenVideo = moveElementToTop(seenVideo, videoId)
            user.seen_video = newSeenVideo
            await user.save()
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    }
}

module.exports = UserController