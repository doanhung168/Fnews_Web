const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { Bcrypt, Constraint } = require('../utlity')

const UserSchema = new Schema({
    avatar: String,
    username: String,
    password: String,
    display_name: String,
    email: String,
    roll: { type: Number, default: 1 }, // 0-admin, 1-user, 2-user-request-write, 3-user-write
    active: { type: Boolean, default: true },
    saved_news: [{ type: Schema.Types.ObjectId, ref: 'News' }],
    liked_media: [{ type: Schema.Types.ObjectId, ref: 'News' }],
    seen_video: { type: [Schema.Types.ObjectId], ref: 'Video' },
    saved_video: { type: [Schema.Types.ObjectId], ref: 'Video' },
    seen_news: [{ type: Schema.Types.ObjectId, ref: 'News' }],
    my_media: [{ type: Schema.Types.ObjectId, ref: 'News' }],
    my_comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    liked_comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    account_type: { type: String, default: Constraint.LOCAL },
    account_id: String,
    time: { type: Number, default: Date.now },
});

UserSchema.pre('save', async function (next) {
    try {
        if (this.password) {
            this.password = await Bcrypt.enscrypt(this.password)
        }
    } catch (e) {
        next(e)
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User