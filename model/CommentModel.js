const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const CommentSchema = new Schema({
    content: String,
    owner: Schema.Types.ObjectId,
    target: Schema.Types.ObjectId,
    target_type: {type: Number, default: 0}, // news = 0 or comment = 1
    time: Number,
    state: {type: Number, default: 0},
    state_extra: String,
    active: {type: Boolean, default: true},
    create_time: {type: Number, default: Date.now()}
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment