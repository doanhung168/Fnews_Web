const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hung0868358175@gmail.com',
        pass: process.env.PASS_EMAIL
    }
})

const sender = {
    send: async (user, subject, message) => {
        await transporter.sendMail({
            from: 'hung0868358175@gmail.com',
            to: user,
            subject: subject,
            html: message
        })
    }
}

module.exports = sender


