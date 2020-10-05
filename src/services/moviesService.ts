import movies from '../assets/data/movie.mock-data.json';
import { Movie } from '../models/movie';

interface movieFilters {
    searchQuery?: string | null;
    genre?: string;
}

const moviesService = {
    getMovies: function (filters: movieFilters = {}): Movie[] {
        return movies.filter(movie => {
            let queryMatch = true;

            if (filters.hasOwnProperty('searchQuery') && filters.searchQuery) {
                queryMatch = movie.name.toLowerCase().indexOf(filters.searchQuery.toLowerCase()) !== -1;
            }

            let genreMatch = true;

            if (filters.hasOwnProperty('genre') && filters.genre) {
                genreMatch = movie.genres.indexOf(filters.genre) !== -1;
            }

            return queryMatch && genreMatch;
        });
    },

    getMovie: function (id: number) {
        let movie: Movie | null = null;

        for (let i = 0; i < movies.length; i++) {
            if (movies[i].id === id) {
                movie = movies[i];
                break;
            }
        }

        return movie;
    },

    getMovieGenres: function () {
        let genres: string[] = [];

        for (let i = 0; i < movies.length; i++) {
            genres = [...new Set([...genres, ...movies[i].genres])];
        }

        return genres;
    }
};

export default moviesService;