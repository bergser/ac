<script lang="ts">
  import type { IPostFull } from "../../interfaces";
	export let post: IPostFull;
</script>

<div class="post">
  <h1>Post: {post.title}</h1>
  <ul>
    {#each post.tags as tag}
      <li>{tag.slug}</li>
    {/each}
  </ul>
  <div class="content">
    {@html post.content}
  </div>
</div>

<style>
  :global(.content img) {
    max-width: 100% !important;
  }
</style>