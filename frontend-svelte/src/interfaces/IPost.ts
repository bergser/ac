import type { ITag } from "./ITag";

export interface IPost {
  id: number;
  title: string;
  content: string;
  tags?: ITag[];
  visibility: 'public' | 'private' | 'members';
}