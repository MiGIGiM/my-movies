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

const Favorites = () => {
  const [results, setResults] = useState<MovieCard[]>(JSON.parse(localStorage.getItem('favorites')));
  const navigate = useNavigate();

  if (results.length === 0) {
    return (
      <>
        <NotFound className="w-2/5  mx-auto" />
        <p className="text-center">
          We couldn&apos;t find any favorites in your account, go add Some.
          {' '}
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center xl:max-w-[90%] xl:mx-auto">
        {results.map((res) => (
          <Card key={res.id} movie={res} />
        ))}
      </div>
    </main>
  );
};

export default Favorites;
