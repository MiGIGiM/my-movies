import React, { FC } from 'react';
import { MovieCastMember } from '../services/http/movies.service';

type CardProps = { cast: MovieCastMember };

const CastCard: FC<CardProps> = ({ cast }) => (
  <div className="card w-80 bg-base-100 shadow-xl image-full">
    <figure>
      <img src={cast.image} alt={cast.name} />
    </figure>
    <div className="card-body">
      <span className="flex flex-col items-end">
        <h2 className="card-title text-right">
          {`${cast.name}`}
          <br />
          as
          <br />
          {`${cast.character}`}
        </h2>
      </span>
    </div>
  </div>
);

export default CastCard;
