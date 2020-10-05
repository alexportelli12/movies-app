import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from './../models/movie';

function MovieCard(props: { movie: Movie }) {

    // Image path used for image src tag
    const imagePath = process.env.PUBLIC_URL + '/images/movie-covers/';

    return (
        <div className="column is-half-mobile is-one-quarter-tablet is-one-fifth-desktop">
            <Link to={'/' + props.movie.id}>
                <div className="card">
                    <div className="card-image">
                        <figure className="image">
                            <img src={imagePath + props.movie.img} alt={props.movie.name} />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            {props.movie.name}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

};

export default MovieCard;