const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const FieldSchema = new Schema({
    value: String,
    description: String,
    time: {type: Number, default: Date.now},
    active: {type: Boolean, default: true}
})

const Field = mongoose.model('Field', FieldSchema)
module.exports = Field