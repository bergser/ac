import type { IPost } from ".";

export interface IPostService {
  limit(num: number): IPostService;
  get(): Promise<IPost[]>;
}