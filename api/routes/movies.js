const express = require('express')
const router = express.Router()

const moviesController = require('../controller/moviesController')

router.get('', moviesController.getAllMovies)

router.post('', moviesController.addMovie)

module.exports = router