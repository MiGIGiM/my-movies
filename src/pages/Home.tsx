/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import {
  UserCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getMoviesSearchResults,
  getPopularMovies,
  MovieCard,
} from '../services/http/movies.service';
import Card from '../components/MovieCard';
import Loader from '../components/Loader';
import authStorage from '../services/storage/auth.storage';
import NotFound from '../components/NotFound';

const Home = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isLoading } = useMutation(() => getPopularMovies());
  const { mutateAsync: mutateSearch, isLoading: searchLoading } = useMutation(
    (query: string) => getMoviesSearchResults(query),
  );
  const [results, setResults] = useState<MovieCard[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await mutateAsync();
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = searchRef.current?.value ?? '';

    const res = await mutateSearch(search);

    if (res) setResults(
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

  if (isLoading || searchLoading) return <Loader className="w-2/5  mx-auto" />;

  if (results.length === 0) {
    return (
      <>
        <div className="navbar bg-base-100 mb-10 flex-0">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl" href="/home">
              🎬
              <span className="hidden md:block"> Movies DB</span>
            </a>
          </div>
          <div className="flex-none gap-2">
            <form
              onSubmit={onSubmit}
              className="flex flex-wrap justify-between md:flex-row"
            >
              <input
                type="text"
                placeholder="Search"
                ref={searchRef}
                className="flex-1 h-10 px-4 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
              />
              <button
                type="submit"
                className="flex items-center justify-center w-full p-2 m-1 text-white transition-colors duration-300 transform rounded-lg lg:w-12 lg:h-12 lg:p-0 bg-primary hover:bg-primary/70 focus:outline-none focus:bg-primary/70"
              >
                <MagnifyingGlassIcon className="hover:text-accent-focus w-5 " />
              </button>
            </form>
            <div className="dropdown dropdown-end">
              <p tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <span className="w-10 rounded-full">
                  <UserCircleIcon className="w-full text-neutral-content hover:text-accent-focus" />
                </span>
              </p>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/favorites');
                    }}
                  >
                    View Favorites
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      authStorage.logout();
                      navigate('/');
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <NotFound className="w-2/5  mx-auto" />
        <p className="text-center">
          We couldn&apos;t find what your looking for.{' '}
          <a className="link link-hover link-secondary" href="/home">
            Return to home
          </a>
        </p>
      </>
    );
  }

  return (
    <main>
      <div className="navbar bg-base-100 mb-10 flex-0">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl" href="/home">
            🎬
            <span className="hidden md:block"> Movies DB</span>
          </a>
        </div>
        <div className="flex-none gap-2">
          <form
            onSubmit={onSubmit}
            className="flex flex-wrap justify-between md:flex-row"
          >
            <input
              type="text"
              placeholder="Search"
              ref={searchRef}
              className="flex-1 h-10 px-4 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none lg:h-12 dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0"
            />
            <button
              type="submit"
              className="flex items-center justify-center w-full p-2 m-1 text-white transition-colors duration-300 transform rounded-lg lg:w-12 lg:h-12 lg:p-0 bg-primary hover:bg-primary/70 focus:outline-none focus:bg-primary/70"
            >
              <MagnifyingGlassIcon className="hover:text-accent-focus w-5 " />
            </button>
          </form>
          <div className="dropdown dropdown-end">
            <p tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <span className="w-10 rounded-full">
                <UserCircleIcon className="w-full text-neutral-content hover:text-accent-focus" />
              </span>
            </p>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/favorites');
                  }}
                >
                  View Favorites
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    authStorage.logout();
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center xl:max-w-[90%] xl:mx-auto">
        {results.map((res) => (
          <Card key={res.id} movie={res} />
        ))}
      </div>
    </main>
  );
};

export default Home;
