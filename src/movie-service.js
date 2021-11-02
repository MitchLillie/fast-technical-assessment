export const getMovies = function (query) {
    const url = `https://www.omdbapi.com/?apikey=e7b6c314&type=movie&s=${query}`;

    return fetch(url, {
        method: 'GET',
    });
}