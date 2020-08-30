import { writable } from 'svelte/store';
import type { IUser } from '../interfaces';

const user = writable(null);

const customStore = {
  subscribe: user.subscribe,
  setUser: (item: IUser) => {
    user.set(item);
  }
}
export default customStore;