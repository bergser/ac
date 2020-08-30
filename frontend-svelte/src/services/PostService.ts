import type { IPostService, IPost } from "../interfaces";

import Showdown from 'Showdown';
const converter = new Showdown.Converter;

export class PostService implements IPostService {

  private _limit: number = 20;
  
  public limit(num: number): IPostService {
    this._limit = num;
    return this;
  }

  public async get(): Promise<IPost[]> {
    const res = await fetch(`http://localhost:1337/posts?_limit=${this._limit}`);
    const data = await res.json() as IPost[];

    const items = data.map(item => {

      let content = converter.makeHtml(item.content);

      const pattern = /(\/uploads\/.*\.(jpg|png|gif))/g;
      item.content = content.replace(pattern, value => {
        return 'http://localhost:1337' + value;
      });

      return item;
    });

    return items;
  }

}