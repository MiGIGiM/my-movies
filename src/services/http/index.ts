/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';

export enum ApiUrls {
    AuthApi,
    MoviesApi,
}

const createInstance = (api: ApiUrls) => {
    const instance = axios.create({
        baseURL:
            api === ApiUrls.AuthApi
                ? import.meta.env.VITE_LOGIN_APP_URL
                : import.meta.env.VITE_MOVIES_APP_URL,
    });

    instance.interceptors.response.use((res) => ({
        ...res.data,
        status: res.status,
    }));

    return instance;
};

export default createInstance;
