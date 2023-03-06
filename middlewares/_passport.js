const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const User = require('../model/user')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.AUTH_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findOne({_id: payload.sub})
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }

    } catch (err) {
        return done(err, false)
    }

}))