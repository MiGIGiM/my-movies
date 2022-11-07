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

export type MovieCrewMember = {
  id: string | number;
  name: string;
  image: string;
};

type MovieCredits = {
  id: number | string;
  cast: MovieCastMember[];
  crew: MovieCrewMember[];
};

export const getPopularMovies = (): Promise<MoviesResponse> =>
  moviesInstance.get('/movie/popular', {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });

export const getMoviesSearchResults = (query: string): Promise<MoviesResponse> =>
  moviesInstance.get('/search/movie', {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
      query,
    },
  });

export const getMovieById = (movieId: string): Promise<MovieCard> => moviesInstance.get(`/movie/${movieId}`, {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  })

export const getMovieCast = (movieId: string): Promise<MovieCredits> =>
  moviesInstance.get(`/movie/${movieId}/credits`, {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });

export const getMovieRecommendations = (
  movieId: string,
): Promise<MoviesResponse> =>
  moviesInstance.get(`/movie/${movieId}/recommendations`, {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });
