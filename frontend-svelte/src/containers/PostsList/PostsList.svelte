<script lang="ts">
  import { onMount } from 'svelte';
  import type { IPost, IPostService } from "../../interfaces";
  import PostCard from "../../components/PostCard/PostCard.svelte";
  import postsStore from '../../stores/posts-store';

  import { getClient, restore, query } from 'svelte-apollo';
  import {PostsQuery} from '../../queries/PostsQuery';

  export let postService: IPostService;

  const client = getClient();

  interface IResponse {
    posts: IPost[]
  }

  onMount( async ()=> {
    // const items = await postService.limit(5).get();

    const postsStoreGql = await query<IResponse, any, any>(client, { query: PostsQuery });
    const res = await postsStoreGql.result();
    console.log(res);
    
    postsStore.setPosts(res.data.posts);
  });

</script>

<section>
  <h2>Posts List</h2>

  {#each $postsStore as post, i}
    <PostCard post={post} />
  {/each}

</section>

<style>

</style>