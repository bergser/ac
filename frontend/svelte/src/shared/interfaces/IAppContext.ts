import type { IAuthService } from "./IAuthService";
import type { IPostService } from "./IPostService";
import type { ITagService } from "./ITagService";

export interface IAppContext {
  postService: IPostService,
  tagService: ITagService,
  authService: IAuthService
}