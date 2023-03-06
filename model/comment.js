const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const CommentSchema = new Schema({
    content: String,
    owner: Schema.Types.ObjectId,
    root: Schema.Types.ObjectId,
    rootType: String,
    time: Date,
    state: String
})

const Comment = mongoose.model('Media', CommentSchema)
module.exports = Comment