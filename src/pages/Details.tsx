import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeartIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import CastCarousel from '../components/CastList';
import Loader from '../components/Loader';
import MovieCarousel from '../components/MovieList';
import { getMovieById, MovieCard } from '../services/http/movies.service';
import NotFound from '../components/NotFound';

const Details = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { mutateAsync, isLoading, isError } = useMutation((id: string) => getMovieById(id));
  const [movieInfo, setMovieInfo] = useState<MovieCard>({
    id: 0,
    overview: '',
    poster: '',
    release_date: '',
    title: '',
    vote_average: 0,
  });

  const fetchData = async () => {
    const res = await mutateAsync(movieId || '');
    setMovieInfo(res);
  };

  useEffect(() => {
    fetchData()
      .then(() => {})
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) return <Loader className="w-2/5  mx-auto" />;
  if (isError) {
    return (
      <>
        <NotFound className="w-2/5  mx-auto" />
        <p className="text-center">
          We couldn&apos;t find what your looking for.
          {' '}
          <a className="link link-hover link-secondary" href="/home">Return to home</a>
        </p>
      </>
    );
  }

  return (
    <main className="mx-auto p-4 space-y-5 overflow-hidden lg:px-36 lg:m-0">
      <section className="lg:grid grid-cols-2 items-center">
        <figure className="p-5 mt-7 bg-white rounded-xl shadow max-w-sm mx-auto relative">
          <button
            type="button"
            className="absolute btn btn-ghost right-5  hover:text-accent-focus"
          >
            <HeartIcon className="h-6 w-6 text-neutral-content" />
          </button>
          <button
            type="button"
            className="absolute btn btn-ghost left-5  hover:text-accent-focus"
            onClick={() => navigate('/home')}
          >
            <ArrowUturnLeftIcon className="h-6 w-6 text-neutral-content" />
          </button>
          <img src={movieInfo.poster} alt={movieInfo.title} />
        </figure>
        <div className="max-w-md">
          <h1 className="text-center text-5xl leading-tight mt-4">
            {movieInfo.title}
          </h1>
          <span className="flex justify-center items-center">
            <p className="badge badge-accent badge-lg text-center">
              {movieInfo.release_date}
            </p>
          </span>
          <p className="text-justify mt-5 max-w-md">{movieInfo.overview}</p>
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-semibold mb-10">Cast</h2>
        <CastCarousel movieId={movieId || ''} />
      </section>
      <section>
        <h2 className="text-3xl font-semibold mb-10">Recommendations</h2>
        <MovieCarousel movieId={movieId || ''} />
      </section>
    </main>
  );
};

export default Details;
