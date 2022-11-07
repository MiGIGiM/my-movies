import React, { FC } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from '../services/http/movies.service';

type CardProps = { movie: MovieCard };

const Card: FC<CardProps> = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="card w-80 bg-base-100 shadow-xl image-full">
      <figure>
        <img src={movie.poster} alt={movie.title} />
      </figure>
      <div className="card-body">
        <span className="flex justify-between">
          <h2 className="card-title">{movie.title}</h2>
          <button className="btn btn-neutral" type="button">
            {movie.vote_average ? `${movie.vote_average}` : 'N/A'}
            <sub>/10</sub>
          </button>
        </span>
        <p>
          Released on
          {` ${movie.release_date}`}
        </p>
        <p className="max text-clip">{movie.overview}</p>
        <div className="card-actions">
          <button
            type="button"
            onClick={() => navigate(`/details/${movie.id}`)}
            className="btn btn-accent"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
