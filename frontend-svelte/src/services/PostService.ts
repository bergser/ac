import type { IPostService, IPost } from "../interfaces";
import Showdown from 'Showdown';
import type ApolloClient from "apollo-client";
import { POSTS_NEW } from "../queries/post";
import { getClient, restore, query } from 'svelte-apollo';

const converter = new Showdown.Converter;

interface IResponse {
  data: {
    posts: IPost[]
  }
}

export class PostService implements IPostService {

  private _limit: number = 20;

  constructor(private apolloClient: ApolloClient<any>, private mediaLibraryURL: string) {

  }
  
  public limit(num: number): IPostService {
    this._limit = num;
    return this;
  }

  public async get(): Promise<IPost[]> {

    const postsStoreGql = await query<IResponse, any, any>(this.apolloClient, { 
      query: POSTS_NEW, 
      variables: {
        limit: this._limit
      } 
    });
    const result = await postsStoreGql.result();
    return result.data.posts.map(p => this.enchancePost(p));
  }

  private enchancePost(post: IPost): IPost {
    let content = converter.makeHtml(post.content);
    const pattern = /(\/uploads\/.*\.(jpg|png|gif))/g;
    post.content = content.replace(pattern, value => {
      return this.mediaLibraryURL + value;
    });
    return post;
  }
}