<script lang="ts">
  import { onMount } from 'svelte';
  import type { IPost, IPostService } from "../../shared/interfaces";
  import PostCard from "../../components/PostCard/PostCard.svelte";

  export let postService: IPostService;

  let posts: IPost[] = [];

  onMount( async ()=> {
    posts = await postService.limit(50).get();
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