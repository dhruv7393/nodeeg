const mongoose = require('mongoose')
const Movies = require('../models/movies')

exports.getAllMovies = (req, res, next) =>{
    Movies.find()
    .exec()
    .then(movies => res.status(200).json(movies))
    .catch(error => res.status(500).json(error))
}

exports.addMovie = (req, res, next) =>{
    console.log(req.body)
    let id = new mongoose.Types.ObjectId()
    const movie = new Movies({
        _id: id,
        title: req.body.title,
        genre: { _id: id, name: req.body.genre.name },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        publishDate: req.body.publishDate
    })
    movie.save()
    .then(movies => res.status(200).json(movies))
    .catch(error => res.status(500).json(error))
}