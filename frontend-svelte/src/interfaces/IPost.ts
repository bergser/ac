import type { ITag } from "./ITag";

export interface IPost {
  id: number;
  title: string;
  feature_image: any;
  tags?: ITag[];
  visibility: 'public' | 'private' | 'members';
}

export interface IPostFull extends IPost {
  content: string;
}