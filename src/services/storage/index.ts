/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default {
  get(key: string) {
    return localStorage.getItem(key) ?? undefined;
  },
  set(key: string, value: any) {
    const store = typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, store);
  },
  delete(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
  setToArray(key: string, value: any[], search: (params: any) => boolean) {
    /** TODO */
  },
};
