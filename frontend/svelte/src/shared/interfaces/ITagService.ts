import type { ITag } from "./ITag";

export interface ITagService {
  findTagsByName(searchString: string): Promise<ITag[]>;
}