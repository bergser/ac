<script lang="ts">
  import type { IPostService } from "../../interfaces";
  import PostCard from "../PostCard/PostCard.svelte";

  export let postService: IPostService;

  const fetchPosts = (async () => {
    const response = await postService.getPosts();
    console.log(response);
    return response;
	})();
</script>

<section>
  <h2>Posts List</h2>
  {#await fetchPosts}
	  <p>...waiting</p>
  {:then data}
    {#each data as post, i}
      <PostCard post={post} />
    {/each}
  {:catch error}
    <p>An error occurred!</p>
  {/await}
</section>

<style>

</style>