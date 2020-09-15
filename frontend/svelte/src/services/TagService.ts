import type { ApolloClient } from "apollo-boost";
import Logger from "js-logger";
import { query } from "svelte-apollo";
import { TAGS_BY_STRING } from "../queries/tag";
import type { ITag, ITagService } from "../shared/interfaces";
const LOG_SOURCE = 'TagService';

export class TagService implements ITagService {

  constructor(private apolloClient: ApolloClient<any>) { }

  public async findTagsByName(searchString: string): Promise<ITag[]> {
    Logger.debug(`[${LOG_SOURCE}] get()`);

    const postsStoreGql = await query<any, any, any>(this.apolloClient, { 
      query: TAGS_BY_STRING,
      variables: {
        searchString
      } 
    });
    const result = await postsStoreGql.result();

    Logger.info(`[${LOG_SOURCE}]`, result);
    return result.data.tags;
  }
}