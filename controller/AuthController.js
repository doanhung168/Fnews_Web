const User = require("../model/UserModel")
const { Constraint, Jwt, EmailSender, Bcrypt } = require('../utlity')
const { uid } = require('uid')

async function findValidDisplayName(displayName) {
    const random = uid(8);
    const result = displayName + '-' + random
    const numberOfUser = await User.count({ display_name: result })
    if (numberOfUser > 0) {
        await findValidDisplayName(displayName)
    } else {
        return result;
    }
}

const AuthController = {
    register: async (req, res) => {
        try {
            const accountType = req.body.account_type;
            if (accountType === Constraint.GOOGLE || accountType === Constraint.FACEBOOK) {
                const exitUser = await User.findOne({ account_type: accountType, account_id: req.body.account_id })
                if (exitUser) {
                    const token = Jwt.encodeToken(exitUser._id)
                    res.setHeader(Constraint.AUTH_KEY, token)
                    return res.json({ success: true, message: null, data: null })
                }

                const _displayName = req.body.display_name
                req.body.display_name = await findValidDisplayName(_displayName.substring(0, 5))
                const user = new User(req.body)
                await user.save()
                if (user) {
                    const token = Jwt.encodeToken(user._id)
                    res.setHeader(Constraint.AUTH_KEY, token)
                    return res.json({ success: true, message: null, data: null })
                }

            } else {

                const exitsUsername = await User.count({ username: req.body.username })
                if (exitsUsername > 0) {
                    return res.json({ success: false, message: "Tên đăng nhập đã tồn tại!", data: null })
                }

                const exitsEmail = await User.count({ email: req.body.email, account_type: Constraint.LOCAL })
                if (exitsEmail > 0) {
                    return res.json({ success: false, message: "Email này đã được đăng ký!", data: null })
                }

                req.body.display_name = req.body.username
                const user = new User(req.body)
                await user.save()
                if (user) {
                    const token = Jwt.encodeToken(user._id)
                    res.setHeader(Constraint.AUTH_KEY, token)
                    return res.json({ success: true, message: null, data: user })
                }
            }

        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    autoLogin: async (req, res) => {
        const user = req.user
        return res.json({
            success: true, message: null, data: { display_name: user.display_name, avatar: user.avatar }
        })
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username })
            if (user) {
                const match = Bcrypt.compareSync(req.body.password, user.password)
                if (match) {
                    const token = Jwt.encodeToken(user._id)
                    res.setHeader(Constraint.AUTH_KEY, token)
                    return res.json({ success: true, message: null, data: { hung: "hung" } })
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
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await User.findOne({ email: email, account_type:  Constraint.LOCAL})
            if (!user) {
                return res.json({ success: false, message: "Email không tồn tại trong hệ thống", data: null })
            }

            const token = Jwt.encodeTokenWithEx(user._id, '1h')
            const message = `Để đổi mật khẩu của ${user.display_name} vui lòng truy cập <a href="http://localhost:3000/reset-password/${user._id}/${token}"> link</a> này!
                            </br> Link sẽ hết hạn trong vòng 1 giờ.`
            await EmailSender.send(email, "[Fnews] Tạo lại mật khẩu", message)
            return res.json({ success: true, message: null, data: null })
        } catch (e) {
            return res.json({ success: false, message: e.message, data: null })
        }
    },

    resetPassword: async (req, res) => {
        const { user_id, token } = req.params
        const user = await User.findOne({ _id: user_id })
        if (!user) {
            return res.json({ success: false, message: "Người dùng không tồn tại", data: null })
        }

        const match = Jwt.verifyToken(token)
        if (!match) {
            return res.json({ success: false, message: "Mã đã hết hạn hoặc sai", data: null })
        }
        user.password = req.body.password
        await user.save()
        return res.json({ success: true, message: "Đổi mật khẩu thành công", data: null })
    },

    loginWithGoogle: async (profile) => {
        const user = await User.findOne({ account_type: Constraint.GOOGLE, account_id: profile.id })
        if (user) {
            return user
        } else {
            const _displayName = profile.displayName;
            const displayName = await findValidDisplayName(_displayName.substring(0, 5))
            const newUser = new User({
                display_name: displayName,
                account_id: profile.id,
                account_type: Constraint.GOOGLE,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            })
            await newUser.save()
            return newUser
        }
    },

    loginWithFacebook: async(profile) => {
        const user = await User.findOne({ account_type: Constraint.FACEBOOK, account_id: profile.id })
        if (user) {
            return user
        } else {
            const _displayName = profile.displayName;
            const displayName = await findValidDisplayName(_displayName.substring(0, 5))
            const newUser = new User({
                display_name: displayName,
                account_id: profile.id,
                account_type: Constraint.FACEBOOK,
                avatar: profile.photos[0].value
            })
            await newUser.save()
            return newUser
        }
    }
}

module.exports = AuthController