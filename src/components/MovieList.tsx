import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getMovieRecommendations,
  MovieCard,
} from '../services/http/movies.service';
import Card from './MovieCard';

type Props = { movieId: string };

const MovieCarousel: FC<Props> = ({ movieId }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`${movieId}_recommended`],
    queryFn: () => getMovieRecommendations(movieId)
  })

  const [results, setResults] = useState<MovieCard[]>([]);

  useEffect(() => {
    if (data) {
      setResults(
        data.results.map((result: any) => ({
          id: result.id,
          title: result.title,
          release_date: new Date(result.release_date).toLocaleDateString(),
          poster: `${import.meta.env.VITE_MOVIES_POSTER_URL}${
            result.poster_path
          }`,
          overview: result.overview,
          vote_average: result.vote_average,
        })),
      );
    }
  }, [data]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center xl:max-w-[90%] xl:mx-auto">
      {results.map((res) => (
        <Card key={res.id} movie={res} />
      ))}
    </div>
  );
};

export default MovieCarousel;
