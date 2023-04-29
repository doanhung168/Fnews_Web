const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const VideoSchema = new Schema({
    content: String,
    title: String,
    linkedNews: { type: Schema.Types.ObjectId, ref: 'News' },
    onwer: { type: Schema.Types.ObjectId, ref: 'User' },
    like: { type: Number, default: 0 },
    state: { type: Number, default: 0 },
    stateExtra: String,
    field: Schema.Types.ObjectId,
    active: { type: Boolean, default: true },
    reports : [{type: Schema.Types.ObjectId, ref: 'Report'}],
    time: Number,
    created_time: {type: Number, default: Date.now()}
})

const Video = mongoose.model('Video', VideoSchema)
module.exports = Video