
const ViewController = {
    home: (req, res) => {
        res.render('home')
    },

    register: (req, res) => {
        res.render('auth_register')
    },

    forgotPassword : (req, res) => {
        res.render('auth_forgot_password')
    },

    login: (req, res) => {
        res.render('auth_login')
    },
    
    resetPassword : (req, res) => {
        console.log(req.params.user_id)
        res.render('auth_reset_password', {user_id: req.params.user_id, token: req.params.token})
    },

    toHome: (req, res) => {
        res.redirect('/')
    },

    profile: (req, res) => {
        res.render('my_profile')
    },
    
    myNews: (req, res) => {
        res.render('my_news')
    },

    myComment: (req, res) => {
        res.render('my_comment')
    },

    mySavedNews: (req, res) => {
        res.render('my_saved_news')
    },

    myNotification: (req, res) => {
        res.render('my_notification')
    },

    compCreateNews: (req, res) => {
        res.render('comp_create_news')
    }

}

module.exports = ViewController