export const getMovies = function (query) {
    const url = `http://www.omdbapi.com/?apikey=e7b6c314&type=movie&s=${query}`;

    return fetch(url, {
        method: 'GET',
    });
}