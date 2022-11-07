import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMovieCast, MovieCastMember } from '../services/http/movies.service';
import Card from './CastCard';

type Props = { movieId: string };

const CastCarousel: FC<Props> = ({ movieId }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`${movieId}_cast`],
    queryFn: () => getMovieCast(movieId),
  });
  const [results, setResults] = useState<MovieCastMember[]>([]);

  useEffect(() => {
   if (data) {
    setResults(
      data.cast.map((cast: any) => ({
        id: cast.id,
        name: cast.name,
        character: cast.character,
        image:
          cast.profile_path !== null
            ? `${import.meta.env.VITE_MOVIES_POSTER_URL}${cast.profile_path}`
            : 'https://wallpapercave.com/wp/wp9566386.jpg',
      })),
    );
   }
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center xl:max-w-[90%] xl:mx-auto">
      {results.map((res) => (
        <Card key={res.id} cast={res} />
      ))}
    </div>
  );
};

export default CastCarousel;
