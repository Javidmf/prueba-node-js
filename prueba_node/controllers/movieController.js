const moviesDataAccess = require('../storage/moviesDataAccess.js');

exports.getMovies = async (req, res) => {
    try {
        var movies = await moviesDataAccess.getMoviesFromAPI(req.body);
        res.status(200).send({movies: movies});
    } catch (e) {
        res.status(404).send({ERROR: e.message});
    }
}

exports.addToFavorites = async (req, res) => {
    try{
        await moviesDataAccess.addFavorite(req.body);
        res.status(201).send('Added movie to favorites');
    } catch (e){
        res.status(500).send('Can\'t open the file');
    }
}

exports.getFavorites = async (req, res) => {
    try{
        var movies = await moviesDataAccess.getFavorites(req.body);
        res.status(200).send({Favorite_movies:movies});
    } catch (e){
        res.status(404).send('Can\'t get movie list');
    }
}