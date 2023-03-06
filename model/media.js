const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const MediaSchema = new Schema({
    title: String,
    description: String,
    type: String,
    field: String,
    content: String,
    comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    time: Date,
    state: String,
    active: Boolean
})

const Media = mongoose.model('Media', MediaSchema)
module.exports = Media