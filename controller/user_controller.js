const User = require("../model/user")
const {uid} = require('uid')
const {jwt} = require('../utility/jwt')
const bcrypt = require('bcryptjs')
const sender = require('../utility/send_email')
const JWT = require('jsonwebtoken')

const userController = {
    register: async (req, res) => {
        try {
            const accountType = req.body.account_type;
            if (accountType === "Google" || accountType === "Facebook") {
                const exitUser = await User.findOne({account_type: accountType, account_id: req.body.account_id})
                if (exitUser) {
                    const token = jwt.encodeToken(exitUser._id)
                    res.setHeader("Authorization", token)
                    return res.json({success: true, message: null, data: null})
                } else {
                    req.body.display_name = await findValidDisplayName(req.body.display_name)
                    const user = new User(req.body)
                    user.active = true
                    await user.save()
                    if (user) {
                        const token = jwt.encodeToken(user._id)
                        res.setHeader("Authorization", token)
                        return res.json({success: true, message: null, data: null})
                    }
                }


            } else {
                const exitsUser = await User.findOne({username: req.body.username})
                if (exitsUser != null) {
                    return res.json({success: false, message: "Tên đăng nhập đã tồn tại!", data: null})
                } else {
                    req.body.display_name = req.body.username
                    const user = new User(req.body)
                    user.active = true
                    await user.save()
                    if (user) {
                        return res.json({success: true, message: null, data: null})
                    }
                }
            }

        } catch (e) {
            return res.json({success: false, message: e.message, data: null})
        }
    },

    autoLogin: async (req, res) => {
        const user = req.user
        return res.json({
            success: true, message: null, data: {
                user: {display_name: user.display_name, avatar: user.avatar}
            }
        })
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username})
            if (user) {
                const match = bcrypt.compareSync(req.body.password, user.password)
                if (match) {
                    const token = jwt.encodeToken(user._id)
                    res.setHeader("Authorization", token)
                    return res.json({success: true, message: null, data: {hung: "hung"}})
                } else {
                    return res.json({
                        success: false, message: "Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu!", data: null
                    })
                }

            } else {
                return res.json({
                    success: false, message: "Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu!", data: null
                })
            }
        } catch (e) {
            return res.json({success: false, message: e.message, data: null})
        }
    },

    updateInfo: async (req, res) => {
        try {
            const user = await User.findOne({display_name: req.body.display_name})
            if (user) {
                return res.json({success: false, message: "Tên này đã tồn tại trong hệ thống", data: null})
            } else {
                const result = await User.findByIdAndUpdate(req.user._id, {
                    display_name: req.body.display_name,
                    avatar: req.body.avatar
                }, {returnDocument: 'after'})
                return res.json({
                    success: true,
                    message: null,
                    data: {display_name: result.display_name, avatar: result.avatar}
                })
            }

        } catch (e) {
            return res.json({success: false, message: e.message, data: null})
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.json({success: false, message: "Vui lòng kiểm tra lại email", data: null})
            }

            const token = jwt.encodeTokenWithEx(user._id, '1h')
            const message = `Để đổi mật khẩu của ${user.display_name} vui lòng truy cập <a href="http://localhost:3000/users/resetPassword/${user._id}/${token}"> link</a> này!
                            </br> Link sẽ hết hạn trong vòng 1 giờ.`
            await sender.send(email, "[Fnews] Tạo lại mật khẩu", message)
            return res.json({success: true, message: null, data: null})
        } catch (e) {
            return res.json({success: false, message: e.message, data: null})
        }
    },

    resetPassword: async (req, res) => {
        const {user_id, token} = req.params
        const user = await User.findOne({_id: user_id})
        if (!user) {
            return res.json({success: false, message: "Người dùng không tồn tại", data: null})
        }

        const match = JWT.verify(token, process.env.AUTH_SECRET)
        if (!match) {
            return res.json({success: false, message: "Mã đã hết hạn hoặc sai", data: null})
        }
        console.log(req.body.password)
        user.password = req.body.password
        await user.save()
        return res.json({success: true, message: "Đổi mật khẩu thành công", data: null})
    }

}

async function findValidDisplayName(displayName) {
    const random = uid(8);
    const result = displayName + random
    const user = await User.findOne({display_name: result})
    if (user != null) {
        await findValidDisplayName(displayName)
    } else {
        return result;
    }
}

const _userController = {
    _resetPassword: async (req, res) => {
        res.render('change_password', {user_id: req.params.user_id, token: req.params.token})
    },


}

module.exports = {userController, _userController}