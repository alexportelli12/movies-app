import React from 'react';
import { Link, useParams } from 'react-router-dom';
import moviesService from './../services/moviesService';

function MovieDetail() {

    let params: { id: string } = useParams();

    // Image path used for image src tag
    const imagePathCover = process.env.PUBLIC_URL + '/images/movie-covers/';
    const imagePathBackground = process.env.PUBLIC_URL + '/images/movie-backgrounds/';

    // Get movie using the id from the route params
    const movie = moviesService.getMovie(parseInt(params.id));

    return (
        <div id="movie-detail">
            <section className="hero is-medium is-primary is-bold">
                <div className="hero-body"
                    style={{ backgroundImage: 'url(' + imagePathBackground + movie?.img + ')' }}>

                    <div className="container">

                        <Link to="/">
                            <div className="back-button">
                                <span className="icon">
                                    <i className="fas fa-chevron-left"></i>
                                </span>
                            </div>
                        </Link>

                        <h1 className="title">
                            {movie?.name}
                        </h1>

                        <div className="tags">
                            {movie?.genres.map((genre: string) => {
                                return (
                                    <span className="tag is-rounded is-small is-capitalized" key={genre}>{genre}</span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="columns">

                        <div className="column is-one-third">
                            <figure className="image rounded">
                                <img src={imagePathCover + movie?.img} alt={movie?.name} />
                            </figure>
                        </div>

                        <div className="column is-two-thirds">

                            <div className="is-size-4 has-text-info mt-4">
                                <span className="icon mr-2">
                                    <i className="fas fa-star"></i>
                                </span>
                                <b>{movie?.rate}</b>
                            </div>

                            <div className="mt-4">
                                <h4 className="is-size-5 has-text-weight-bold">Length</h4>
                                <p>{movie?.length}</p>
                            </div>

                            <div className="mt-4">
                                <h4 className="is-size-5 has-text-weight-bold">Description</h4>
                                <p>{movie?.description}</p>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default MovieDetail;