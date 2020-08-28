import { writable } from 'svelte/store';
import type { IPost } from '../interfaces';

const posts = writable([] as IPost []);

const customStore = {
  subscribe: posts.subscribe,
  setPosts: (items: IPost[]) => {
    posts.set(items);
  }
}

export default customStore;