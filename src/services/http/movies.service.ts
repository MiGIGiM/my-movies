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

export const getPopularMovies = async (): Promise<MoviesResponse> => {
  const res = await moviesInstance.get('/movie/popular', {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });

  return {
    ...res,
    results: res.results.map((result: any) => ({
      id: result.id,
      title: result.title,
      release_date: new Date(result.release_date).toLocaleDateString(),
      poster: `${import.meta.env.VITE_MOVIES_POSTER_URL}${result.poster_path}`,
      overview: result.overview,
      vote_average: result.vote_average,
    })),
  };
};

export const getMoviesSearchResults = async (
  query: string,
): Promise<MoviesResponse> => {
  const res = await moviesInstance.get('/search/movie', {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
      query,
    },
  });

  return {
    ...res,
    results: res.results.map((result: any) => ({
      id: result.id,
      title: result.title,
      release_date: new Date(result.release_date).toLocaleDateString(),
      poster: `${import.meta.env.VITE_MOVIES_POSTER_URL}${result.poster_path}`,
      overview: result.overview,
      vote_average: result.vote_average,
    })),
  };
};

export const getMovieById = async (movieId: string): Promise<MovieCard> => {
  const res = await moviesInstance.get(`/movie/${movieId}`, {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });

  return {
    id: res.id,
    title: res.title,
    release_date: new Date(res.release_date).toLocaleDateString(),
    poster: `${import.meta.env.VITE_MOVIES_POSTER_URL}${res.poster_path}`,
    overview: res.overview,
    vote_average: res.vote_average,
    favorite: localStorage.findInArray(res.id.toString()),
  };
};

export const getMovieCast = async (
  movieId: string,
): Promise<MovieCastMember> => {
  const res = await moviesInstance.get(`/movie/${movieId}/credits`, {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });

  return res.cast.map((cast: any) => ({
    id: cast.id,
    name: cast.name,
    character: cast.character,
    image:
      cast.profile_path !== null
        ? `${import.meta.env.VITE_MOVIES_POSTER_URL}${cast.profile_path}`
        : 'https://wallpapercave.com/wp/wp9566386.jpg',
  }));
};

export const getMovieRecommendations = async (
  movieId: string,
): Promise<MoviesResponse> => {
  const res = await moviesInstance.get(`/movie/${movieId}/recommendations`, {
    params: {
      api_key: import.meta.env.VITE_MOVIES_API_TOKEN,
    },
  });

  return {
    ...res,
    results: res.results.map((result: any) => ({
      id: result.id,
      title: result.title,
      release_date: new Date(result.release_date).toLocaleDateString(),
      poster: `${import.meta.env.VITE_MOVIES_POSTER_URL}${result.poster_path}`,
      overview: result.overview,
      vote_average: result.vote_average,
    })),
  };
};
