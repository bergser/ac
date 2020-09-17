<script lang="ts">
  import { onMount, tick } from 'svelte';
  import type { IPost, ITag } from "../../shared/interfaces";
  import PostCard from "../../components/PostCard/PostCard.svelte";
  import LazyLoad from "vanilla-lazyload";

  import {getAppContext} from '../../context/appContext';
  
  const appContext = getAppContext();
  const {postService} = appContext;

  let posts: IPost[] = [];
  let tags: { [key: string]: ITag} = {};

  
  let status: "loading" | "loaded" = "loading";

  onMount( async ()=> {

    posts = await postService.limit(50).get();
    for (const post of posts) {
      for (const tag of post.tags) {
        tags[tag.slug] = tag;
      }
    }
    console.log(tags);
    status = "loaded";

    await tick();
    let lazyLoad = new LazyLoad();
  });
  
</script>

<div id="posts" class="flex flex-wrap">
  {#if status === "loading"}
    <div>Loading posts...</div>
  {:else if status === "loaded"}
  
    {#each posts as post, i}
      <PostCard post={post} />
    {/each}
  {/if}
</div>

<style>

</style>