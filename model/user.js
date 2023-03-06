const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    avatar: String,
    username: String,
    password: String,
    display_name: String,
    email: String,
    roll: Number,
    active: Boolean,
    saved_media: [{type: Schema.Types.ObjectId, ref: 'Media'}],
    liked_media: [{type: Schema.Types.ObjectId, ref: 'Media'}],
    seen_media: [{type: Schema.Types.ObjectId, ref: 'Media'}],
    my_media: [{type: Schema.Types.ObjectId, ref: 'Media'}],
    my_comment: [{type: Schema.Types.ObjectId, ref: 'MediaComment'}],
    account_type: String,
    account_id: String,
    time: {type: Date, default: Date.now}
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (e) {
        next(e)
    }
})

module.exports = mongoose.model('User', UserSchema)