var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

var movieController = require('../controllers/movieController');
var userController = require('../controllers/userController');

router.post('/user', userController.register);
router.post('/user/login', userController.authenticate);

router.get('/movies', auth, movieController.getMovies);
router.get('/favorites', auth, movieController.getFavorites);
router.post('/favorite', auth, movieController.addToFavorites);

module.exports = router;