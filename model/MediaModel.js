const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const MediaSchema = new Schema({
    avatar: String,
    title: String,
    type: String,
    field: String,
    content: String,
    comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    time: {type: Date, default: new Date().getTime()},
    state: {type: Number, default: 1}, // 1.pending, 2.approved, 3.reject
    active: {type: Boolean, default: true},
    tags: [String],
    author: [{type: Schema.Types.ObjectId, ref: 'User'}],
    like : {type: Number, default: 0},
    dislike: {type: Number, default: 0}
})

const Media = mongoose.model('Media', MediaSchema)
module.exports = Media