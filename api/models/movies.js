const mongoose = require('mongoose')


const moviesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    genre: { _id: String, name: String },
    numberInStock: Number,
    dailyRentalRate: Number,
    publishDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Movies', moviesSchema )