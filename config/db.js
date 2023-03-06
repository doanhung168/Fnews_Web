const mongoose = require('mongoose')

function connectDB(url) {
    mongoose.connect(url)
        .then(() => console.log('Database Connected!'))
        .catch((err) => console.log(err))
}

module.exports = {connectDB}

