import React, { FC, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  getMovieRecommendations,
  MovieCard,
} from '../services/http/movies.service';
import Card from './MovieCard';

type Props = { movieId: string };

const MovieCarousel: FC<Props> = ({ movieId }) => {
  const { mutateAsync, isLoading } = useMutation((id: string) => getMovieRecommendations(id));
  const [results, setResults] = useState<MovieCard[]>([]);

  const fetchData = async () => {
    const res = await mutateAsync(movieId);
    setResults(
      res.results.map((result: any) => ({
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
  };

  useEffect(() => {
    fetchData()
      .then(() => {})
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center xl:max-w-[90%] xl:mx-auto">
      {results.map((res) => (
        <Card key={res.id} movie={res} />
      ))}
    </div>
  );
};

export default MovieCarousel;
