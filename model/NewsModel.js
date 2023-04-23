const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const NewsSchema = new Schema({
    avatar: String,
    title: String,
    field: {type: Schema.Types.ObjectId},
    content: String,
    like : {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    time: Number,
    state: {type: Number, default: 1}, // 1.pending, 2.approved, 3.reject
    stateExtra: String,
    active: {type: Boolean, default: true},
    tags: [String],
    author: [{type: Schema.Types.ObjectId, ref: 'User'}],
    authorName: String, 
})

const News = mongoose.model('News', NewsSchema)
module.exports = News