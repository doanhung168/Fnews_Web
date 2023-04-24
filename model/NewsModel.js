const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const NewsSchema = new Schema({
    avatar: String,
    title: String,
    field: { type: Schema.Types.ObjectId },
    content: String,
    like: { type: Number, default: 0 },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    time: Number,
    state: { type: Number, default: 0 }, // 0.pending, 1.approved, 2.reject
    stateExtra: String,
    active: { type: Boolean, default: true },
    tags: [String],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: String,
    reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }]
})

const News = mongoose.model('News', NewsSchema)
module.exports = News