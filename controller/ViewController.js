
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

    createNews: (req, res) => {
        res.render('news_create')
    },

    fieldManagement: (req, res) => {
        res.render('field_management')
    },

    editNews : (req, res) => {
        res.render('news_edit', {id: req.params.id})
    },

    newsManagement: (req, res) => {
        res.render('admin_news_management')
    },

    reviewNews: (req, res) => {
        res.render('admin_news_review', {id: req.params.id})
    },

    myVideos : (req, res) => {
        res.render('my_video')
    },

    videoManagement: (req, res) => {
        res.render('admin_video_management')
    },

    reviewVideo: (req, res) => {
        res.render('admin_review_video', {id: req.params.id})
    },

    viewNews : (req, res) => {
        res.render('news_view',{id: req.params.id})
    },

    commentManagement : (req, res) => {
        res.render('admin_comment_management')
    }

}

module.exports = ViewController