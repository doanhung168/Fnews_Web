const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const CommentSchema = new Schema({
    content: String,
    owner: Schema.Types.ObjectId,
    root: Schema.Types.ObjectId,
    rootType: String,
    time: Number,
    state: String
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment