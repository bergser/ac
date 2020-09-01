import type { ITag } from "./ITag";
import type { IImage } from "./IImage";

export interface IPost {
  id: number;
  title: string;
  feature_image: IImage;
  tags?: ITag[];
  visibility: 'public' | 'private' | 'members';
  content: string;
}