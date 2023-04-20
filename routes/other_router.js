const express = require('express');
const router = express.Router();
const {uploadImage , uploadVideo} = require('../middlewares/upload_file')


router.post('/upload-image', uploadImage.single('avatar'), (req, res, next) => {
    try {
        const file = req.file
        const filePath = req.file.path
        const myArray = filePath.split("\\")
        const readPath = myArray[1] + '/' + myArray[2]
        return res.json({ success: true, message: null, data: { imageName: file.filename, imageUrl: readPath } })
    } catch (e) {
        return res.json({ success: false, message: e.message, data: null })
    }
})

router.post('/upload-video', uploadVideo.single('video'), (req, res, next) => {
    try {
        const file = req.file
        const filePath = req.file.path
        const myArray = filePath.split("\\")
        const readPath = myArray[1] + '/' + myArray[2]
        return res.json({ success: true, message: null, data: { videoName: file.filename, videoUrl: readPath } })
    } catch (e) {
        return res.json({ success: false, message: e.message, data: null })
    }
})

module.exports = router