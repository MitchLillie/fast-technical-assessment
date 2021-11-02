import {useEffect, useState} from "react";
import {getMovies} from "./movie-service";

export const useMovies = (query) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getMovies(query)
            .then(res => res.json())
            .then((response) => {
                setLoading(false);
                if (response.Response === 'True') {
                    setMovies(response?.Search ?? []);
                } else {
                    // Handle 200s that give us an error
                    let error = response.Error;
                    // This is a misleading error, so rewrite it to be more informative.
                    if (error === 'Incorrect IMDb ID.') {
                        error = 'Please enter a query above.'
                    }
                    setError(error);
                }
                }, (error) => {
                    setLoading(false);
                    setError(error);
                });
        setLoading(true);
        setError(null);
    }, [query]);
    return [movies, error, loading]
}