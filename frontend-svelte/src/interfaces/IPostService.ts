import type { IPost } from ".";

export interface IPostService {
  getPosts(): Promise<IPost[]>;
}