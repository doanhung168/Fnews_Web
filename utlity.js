const JWT = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcryptjs = require('bcryptjs')


const Constraint = {
    AUTH_KEY: 'Authorization',
    LOCAL: 'local',
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    JWT: 'jwt',
    GOOGLE_CALLBACK_URL: 'http://localhost:3000/auth/google-login-callback',
    FACEBOOK_CALLBACK_URL: 'http://localhost:3000/auth/facebook-login-callback'
}

const Jwt = {
    encodeToken: (userId) => {
        return JWT.sign({
            iss: 'Nguyen Hung',
            sub: userId,
            iat: new Date().getTime()
        }, process.env.AUTH_SECRET)
    },

    encodeTokenWithEx: (userId, ex) => {
        return JWT.sign({
            iss: 'Nguyen Hung',
            sub: userId,
            iat: new Date().getTime()
        }, process.env.AUTH_SECRET, { expiresIn: ex })
    },

    verifyToken: (token) => {
        return JWT.verify(token, process.env.AUTH_SECRET)
    }
}

const UserUtility = {
    checkAndAsignCookie: async (req, res, next) => {
        if (req.user) {
            console.log(req.user)
            const token = Jwt.encodeToken(req.user._id)
            res.cookie('Authorization', token)
            next()
        } else {
            res.redirect('/login')
        }
    }
}



const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hung0868358175@gmail.com',
        pass: process.env.PASS_EMAIL
    }
})

const EmailSender = {

    send: async (user, subject, message) => {
        await Transporter.sendMail({
            from: 'hung0868358175@gmail.com',
            to: user,
            subject: subject,
            html: message
        })
    }
}

const Bcrypt = {
    enscrypt: async (text) => {
        const salt = bcryptjs.genSaltSync(10)
        return await bcryptjs.hash(text, salt)
    },

    compareSync: (text1, text2) => {
        return bcryptjs.compareSync(text1, text2)
    }
}

module.exports = {Jwt, UserUtility, EmailSender, Constraint, Bcrypt }