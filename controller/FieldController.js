const Field = require('../model/FieldModel')

const FieldControler = {
    add: async (req, res) => {
        try {
            if (req.user.roll === 0) {
                console.log(req.body)
                const existsField = await Field.count({ value: req.body.value })
                console.log(existsField)
                if (existsField === 0) {
                    const newField = new Field(req.body)
                    await newField.save()
                    return res.json({ success: true, message: null, data: { id: newField._id } })
                } else {
                    return res.json({ success: false, message: "Đã tồn tại chủ đề này", data: null })
                }
            } else {
                return res.json({ success: false, message: "Bạn không có quyền để tạo một chủ đề", data: null })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    get: async (req, res) => {
        try {
            if(req.query.active) {
                const fields = await Field.find({active: true}).sort({ time: -1 })
                return res.json({ success: true, message: null, data: fields })
            } else {
                const fields = await Field.find().sort({ time: -1 })
                return res.json({ success: true, message: null, data: fields })
            }
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    update: async (req, res) => {
        try {
            console.log(req.body)
            await Field.findOneAndUpdate({ _id: req.body.fieldId }, req.body, { returnDocument: 'after' })
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    hideField: async (req, res) => {
        try {
            const field = await Field.findOne({_id: req.body.id})
            if(field) {
                field.active = !field.active
                await field.save()
            }
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    },

    delete : async (req, res) => {
        try {
            await Field.findOneAndDelete({_id: req.body.id})
            return res.json({ success: true, message: null, data: null })
        } catch (error) {
            return res.json({ success: false, message: error.message, data: null })
        }
    }
}

module.exports = FieldControler