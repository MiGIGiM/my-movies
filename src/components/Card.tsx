import React, { FC } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { MovieCard } from '../services/http/movies.service';

type CardProps = { movie: MovieCard };

const Card: FC<CardProps> = ({ movie }) => (
    <div className="card w-80 bg-base-100 shadow-xl image-full">
        <figure>
            <img src={movie.poster} alt={movie.title} />
        </figure>
        <div className="card-body">
            <span className="flex justify-between">
                <h2 className="card-title">{movie.title}</h2>
                <button className="btn btn-ghost" type="button">
                    <HeartIcon className="h-6 w-6 text-neutral-content hover:text-accent-focus" />
                </button>
            </span>
            <p>
                Released on
                {` ${movie.release_date}`}
            </p>
            <p className="max text-clip">{movie.overview}</p>
        </div>
    </div>
);

export default Card;
