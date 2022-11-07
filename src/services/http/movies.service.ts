/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import createInstance, { ApiUrls } from './index';

const moviesInstance = createInstance(ApiUrls.MoviesApi);

type MovieCard = {
    id: number;
    title: string;
    release_date: string;
    poster: string;
};

type MoviesResponse = {
    page: number;
    results: MovieCard[];
    total_pages: number;
    total_results: number;
};

export const getPopularMovies = async (): Promise<
    AxiosResponse & MoviesResponse
> => {
    const res = await moviesInstance.get('');

    return {
        ...res,
        results: res.results.map((result: any) => ({
            id: result.id,
            title: result.title,
            release_date: result.release_date,
            poster: `${import.meta.env.VITE_MOVIES_POSTER_URL}${
                result.poster_path
            }`,
        })),
    };
};

export const getMoviesSearchResults = (keywords: string) =>
    moviesInstance.get(`/search/${keywords}`);
