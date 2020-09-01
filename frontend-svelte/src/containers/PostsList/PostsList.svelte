<script lang="ts">
  import { onMount } from 'svelte';
  import type { IPost, IPostService } from "../../interfaces";
  import PostCard from "../../components/PostCard/PostCard.svelte";

  export let postService: IPostService;

  let posts: IPost[] = [];

  onMount( async ()=> {
    posts = await postService.limit(15).get();
  });
</script>

<section>
  <h2>Posts List</h2>
    {#each posts as post, i}
      <PostCard post={post} />
    {/each}
</section>

<style>

</style>