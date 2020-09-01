<script lang="ts">
  import type { IPost } from "../../interfaces";
	export let post: IPost;
</script>

<div class="post">
  <h1>Post: {post.title}</h1>
  <img src={post.feature_image.formats.medium.url} alt="">
  <ul>
    {#each post.tags as tag}
      <li>{tag.slug}</li>
    {/each}
  </ul>
</div>

<style>

</style>