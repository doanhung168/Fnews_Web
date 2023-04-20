const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg') {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg')
        } else if (file.mimetype === 'image/png') {
            cb(null, file.fieldname + '-' + Date.now() + '.png')
        } else if (file.mimetype === 'video/gif') {
            cb(null, file.fieldname + '-' + Date.now() + '.gif')
        } else if (file.mimetype === 'video/mp4') {
            cb(null, file.fieldname + '-' + Date.now() + '.mp4')
        } else if (file.mimetype === 'video/wmv') {
            cb(null, file.fieldname + '-' + Date.now() + '.wmv')
        } else {
            cb(null, file.fieldname + '-' + Date.now())
        }
    }
})

// Define the filter for uploaded files
const imageFilter = function (req, file, cb) {
    // Only allow certain image formats
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
    }
};

const videoFilter = function (req, file, cb) {
    // Only allow certain image formats
    if (file.mimetype === 'video/gif' || file.mimetype === 'video/mp4' || file.mimetype === 'video/wmv'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only GIF, MP4 and WMV files are allowed.'));
    }
};

const uploadImage = multer({ storage: storage, fileFilter: imageFilter })
const uploadVideo = multer({ storage: storage, fileFilter: videoFilter })
module.exports = { uploadImage, uploadVideo }