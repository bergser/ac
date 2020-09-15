<script lang="ts">
  import { onMount } from 'svelte';
  import type { IPost, IPostService, ITag } from "../../shared/interfaces";
  import PostCard from "../../components/PostCard/PostCard.svelte";

  export let postService: IPostService;

  let posts: IPost[] = [];
  let tags: { [key: string]: ITag} = {};

  onMount( async ()=> {
    posts = await postService.limit(50).get();
    for (const post of posts) {
      for (const tag of post.tags) {
        tags[tag.slug] = tag;
      }
    }
    console.log(tags);
  });
  
</script>

<section>
  <div class="flex flex-wrap">
    {#each posts as post, i}
      <PostCard post={post} />
    {/each}
  </div>
</section>

<style>

</style>