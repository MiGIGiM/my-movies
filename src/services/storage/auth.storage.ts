import localStorage from './index';

export default {
  getToken() {
    return localStorage.get('auth');
  },
  login(token: string) {
    localStorage.set('auth', token);
  },
  logout() {
    localStorage.delete('auth');
  },
  isLogged() {
    return this.getToken() !== undefined;
  },
};
