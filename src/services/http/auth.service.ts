import createInstance, { ApiUrls } from './index';

const authInstance = createInstance(ApiUrls.AuthApi);

export interface LoginVM {
  email: string;
  password: string;
}

export const login = (data: LoginVM): Promise<{ token: string }> =>
  authInstance.post('', data);
