const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const AuthController = require('../controller/AuthController')
const { Constraint } = require('../utlity')
const User = require('../model/UserModel')



// Local
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.AUTH_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findOne({ _id: payload.sub })
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }

    } catch (err) {
        return done(err, false)
    }

}))


// Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: Constraint.GOOGLE_CALLBACK_URL
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await AuthController.loginWithGoogle(profile)
            done(null, user)
        } catch (e) {
            done(e, false)
        }
    }
));

// Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: Constraint.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'picture.type(large)']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await AuthController.loginWithFacebook(profile)
            done(null, user)
        } catch (e) {
            done(e, false)
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

