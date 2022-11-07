/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import createInstance, { ApiUrls } from './index';
import localStorage from '../storage/index';

const moviesInstance = createInstance(ApiUrls.MoviesApi);

export type MovieCard = {
  id: number;
  title: string;
  release_date: string;
  poster: string;
  overview: string;
  vote_average: number;
  favorite?: boolean;
};

type MoviesResponse = {
  page: number;
  results: MovieCard[];
  total_pages: number;
  total_results: number;
};

export type MovieCastMember = {
  id: string | number;
  name: string;
  character: string;
  image: string;
};

export const getPopularMovies = () =>
  moviesInstance.get('/movie/popular', {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });

export const getMoviesSearchResults = (query: string) =>
  moviesInstance.get('/search/movie', {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
      query,
    },
  });

export const getMovieById = (movieId: string) => moviesInstance.get(`/movie/${movieId}`, {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  })

export const getMovieCast = (movieId: string) =>
  moviesInstance.get(`/movie/${movieId}/credits`, {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });

export const getMovieRecommendations = (
  movieId: string,
)=>
  moviesInstance.get(`/movie/${movieId}/recommendations`, {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });
