const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const ReportSchema = Schema({
    content: String,
    linkedNews: Schema.Types.ObjectId,
    resovle: Boolean,
    owner: Schema.Types.ObjectId,
    time: {type: Number, default: Date.now}
})

const Report = mongoose.model('Report', ReportSchema)
module.exports = Report