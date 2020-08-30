<script lang="ts">
  import { onMount } from 'svelte';
  import type { IPost, IPostService } from "../../interfaces";
  import PostCard from "../../components/PostCard/PostCard.svelte";
  import postsStore from '../../stores/posts-store';

  export let postService: IPostService;

  onMount( async ()=> {
    const items = await postService.limit(5).get();

    postsStore.setPosts(items);
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