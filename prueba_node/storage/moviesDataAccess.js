const fs = require('fs');
const request = require('request');
const moment = require('moment');

exports.getMoviesFromAPI = async (req) => {

    //esto no lo pude probar, en la pagina me tiraba 503
    return new Promise((resolve, reject) => {
        if (req.keyword === undefined)
            req.keyword = '';
        var apiUrl = 'https://api.themoviedb.org/3/keyword/' + req.keyword + '/movies?api_key=0bd29650b0bf794c070e2aa6105e4f5b&language=en-US&include_adult=false';
        resolve(request.get(apiUrl, (err, response) => {
            if (err) {
                reject(err);
            } else {
                var result = JSON.parse(response.body);
                if (result.success) {
                    result.results.forEach(movie => {
                        movie.suggestionScore = getRandomInt(99);
                    })
                    //orden ascendente
                    result.results.sort((a, b) => { return a.suggestionScore - b.suggestionScore });
                    resolve(result);
                } else{
                    reject(result);
                }
            }
        }))
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.addFavorite = async (data) => {
    return new Promise((resolve, reject) => {
        data.addedAt = moment(Date.now()).format('DD/MM/YYYY');
        fs.appendFile('./storage/favorites.txt', JSON.stringify(data) + '\r\n', (err) => {
            if(err){
                reject();
            }
            resolve();
        });
    })
}

exports.getFavorites = async (data) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./storage/favorites.txt', 'UTF-8', async (err, fileData) => {
            if (err) {
                reject();
            }
            const favorites = fileData;
            
            var moviesArray = fileData.split("\r\n");
            moviesArray.pop();
            moviesArray.forEach((movie) => {
                var actualMovie = JSON.parse(movie);
                actualMovie.suggestionForTodayScore = getRandomInt(99);
            })
            //orden ascendente
            moviesArray.sort((a, b) => { return a.suggestionForTodayScore - b.suggestionForTodayScore });
            resolve(moviesArray);
        })
    })
}