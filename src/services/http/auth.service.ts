import { AxiosResponse } from 'axios';
import createInstance, { ApiUrls } from './index';

const authInstance = createInstance(ApiUrls.AuthApi);

export interface LoginVM {
    email: string;
    password: string;
}

export const login = (
    data: LoginVM,
): Promise<AxiosResponse & { token: string }> => authInstance.post('', data);
