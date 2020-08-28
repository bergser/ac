import type { IPostService, IPost } from "../interfaces";

export class MockPostService implements IPostService {
  
  async getPosts(): Promise<IPost[]> {
    const smaplePosts: IPost[] = [
      {
        id: 1,
        content: 'test content',
        title: 'title 1'
      },
      {
        id: 2,
        content: 'blog entry 2',
        title: 'title 2'
      }
    ];
    return smaplePosts;
  }

}