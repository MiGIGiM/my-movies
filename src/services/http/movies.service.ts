/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import createInstance, { ApiUrls } from './index';

const moviesInstance = createInstance(ApiUrls.MoviesApi);

export type MovieCard = {
    id: number;
    title: string;
    release_date: string;
    poster: string;
    overview: string;
};

type MoviesResponse = {
    page: number;
    results: MovieCard[];
    total_pages: number;
    total_results: number;
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
            poster: `${import.meta.env.VITE_MOVIES_POSTER_URL}${
                result.poster_path
            }`,
            overview: result.overview,
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
            poster: `${import.meta.env.VITE_MOVIES_POSTER_URL}${
                result.poster_path
            }`,
            overview: result.overview,
        })),
    };
};
