const JWT = require('jsonwebtoken')

const jwt = {
    encodeToken: (userId) => {
        return JWT.sign({
            iss: 'Nguyen Hung',
            sub: userId,
            iat: new Date().getTime()
        }, process.env.AUTH_SECRET)
    },

    encodeTokenWithEx : (userId, ex) => {
        return JWT.sign({
            iss: 'Nguyen Hung',
            sub: userId,
            iat: new Date().getTime()
        }, process.env.AUTH_SECRET, {expiresIn: ex})
    }
}

module.exports = {jwt}