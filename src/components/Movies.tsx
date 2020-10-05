import React from 'react';
import moviesService from './../services/moviesService';
import { Movie } from '../models/movie';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

// Define component props type
type MoviesProps = {
    genre?: string,
    searchQuery?: string
};

// Define component state type
type MoviesState = {
    genre?: string,
    searchQuery?: string,
    movies: Movie[]
};

class Movies extends React.Component<MoviesProps, MoviesState> {

    // Get list of genres to fill select options
    private genres = moviesService.getMovieGenres();

    constructor(props: any) {
        super(props);

        // Set the initial state of the component
        this.state = {
            genre: this.props.genre,
            searchQuery: this.props.searchQuery,
            movies: this.getMovies(
                {
                    genre: this.props.genre,
                    searchQuery: this.props.searchQuery
                }
            )
        };

        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    }

    private getMovies(filters?: { searchQuery?: string | null, genre?: string }): Movie[] {
        // When filters object is not passed get filters from state
        return moviesService.getMovies(filters ? filters : { genre: this.state.genre, searchQuery: this.state.searchQuery });
    }

    private handleGenreChange(genre: string) {
        this.setState(
            {
                genre: genre
            },
            // Once state has been updated get updated movies list
            this.updateMoviesState.bind(this)
        );
    }

    private handleSearchQueryChange(event: any) {
        const target = event.target;
        const value = target.value;

        this.setState(
            {
                searchQuery: value
            },
            // Once state has been updated get updated movies list
            this.updateMoviesState.bind(this)
        );
    }

    private updateMoviesState() {
        this.setState(
            {
                movies: this.getMovies()
            }
        );
    }

    render() {
        // Create genre select options
        const genreOptions = this.genres.map((genre: string) => {
            return (
                <li className={genre === this.state.genre ? 'is-active' : ''}
                    value={genre}
                    key={genre}
                    onClick={() => { this.handleGenreChange(genre) }}>{genre}</li>
            );
        });

        // Create movie card elements
        const movieElements = this.state.movies.map((movie: Movie) => {
            return (
                <MovieCard movie={movie} key={movie.key} />
            );
        });

        return (
            <section className="section">
                <div className="container">

                    <div className="columns is-vcentered">
                        <div className="column is-one-third">
                            <Link to="/">
                                <div className="is-capitalized is-size-4">
                                    <b>MOVIES</b>APP
                                </div>
                            </Link>
                        </div>
                        <div className="column is-two-thirds">
                            <input className="input"
                                type="text"
                                placeholder="Search Movies"
                                value={this.state.searchQuery || ''}
                                onChange={this.handleSearchQueryChange} />
                        </div>
                    </div>

                    <div className="columns is-mobile">
                        <div className="column is-full">
                            <div className="tabs">
                                <ul className="is-capitalized">
                                    {/* Add extra genre option to show all movies */}
                                    <li className={!this.state.genre ? 'is-active' : ''}
                                        value=""
                                        onClick={() => { this.handleGenreChange('') }}>All Movies</li>
                                    {/* Fill genre options */}
                                    {genreOptions}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="columns is-mobile is-multiline">
                        {/* Fill movie card elements */}
                        {movieElements}
                    </div>
                </div>
            </section>
        );
    }

}

export default Movies;