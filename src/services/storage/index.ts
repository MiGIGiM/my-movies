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
  setToArray(value: any) {
    if (this.get('favorites') === undefined) this.set('favorites', [value]);

    if (this.get('favorites') !== undefined) {
      let favArray: any[] = JSON.parse(this.get('favorites') || '');
      const result = favArray.filter((item) => item.id === value.id);

      if (result.length > 0) {
        this.set(
          'favorites',
          favArray.filter((item) => item.id !== value.id),
        );
      } else {
        favArray.push(value);
        this.set('favorites', favArray);
      }
    }
  },
  findInArray(valueId: string): boolean {
    const arr: any[] = JSON.parse(this.get('favorites') || '[]');

    const arrFiltered = arr.filter((element) => element.id === valueId)

    return arrFiltered.length > 0;
  },
};
