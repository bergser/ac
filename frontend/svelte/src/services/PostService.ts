import type { IPostService, IPost } from "../../../shared/interfaces";
import showdown from 'showdown';
import type ApolloClient from "apollo-client";
import { POSTS_NEW } from "../queries/post";
import { restore, query } from 'svelte-apollo';
import Logger from  'js-logger';
const LOG_SOURCE: string = 'PostService';

const converter = new showdown.Converter;

interface IResponse {
  data: {
    posts: IPost[]
  }
}

export class PostService implements IPostService {

  private _limit: number = 20;

  constructor(
    private apolloClient: ApolloClient<any>,
    private mediaLibraryURL: string
    ) {

  }
  
  public limit(num: number): IPostService {
    this._limit = num;
    return this;
  }

  public async get(): Promise<IPost[]> {

    Logger.debug(`[${LOG_SOURCE}] get()`);

    const postsStoreGql = await query<IResponse, any, any>(this.apolloClient, { 
      query: POSTS_NEW,
      variables: {
        limit: this._limit
      } 
    });
    const result = await postsStoreGql.result();

    Logger.info(`[${LOG_SOURCE}]`, result);
    return result.data.posts.map(p => this.enchancePost(p));
  }

  private enchancePost(post: IPost): IPost {
    const {mediaLibraryURL} = this;

    if (post.content) {
      let content = converter.makeHtml(post.content);
      const pattern = /(\/uploads\/.*\.(jpg|png|gif))/g;
      post.content = content.replace(pattern, value => {
        return mediaLibraryURL + value;
      });
    }

    if (post.feature_image) {
      post.feature_image.url = `${mediaLibraryURL}${post.feature_image.url}`;

      for (const key in post.feature_image.formats) {
        if (Object.prototype.hasOwnProperty.call(post.feature_image.formats, key)) {
          const element = post.feature_image.formats[key];
          element.url = `${mediaLibraryURL}${element.url}`;
        }
      }
    }

    return post;
  }
}