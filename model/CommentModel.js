const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const CommentSchema = new Schema({
    content: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    target: Schema.Types.ObjectId,
    target_type: {type: Number, default: 0}, // news = 0 or comment = 1
    childrent_comment: {type: [Schema.Types.ObjectId], ref: 'Comment'},
    time: Number,
    state: {type: Number, default: 0},
    like: {type: Number, default: 0},
    state_extra: String,
    active: {type: Boolean, default: true},
    create_time: {type: Number, default: Date.now()}
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment