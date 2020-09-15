<script lang="ts">
  import type { IPost } from "../../shared/interfaces";
  export let post: IPost;

  const tizer = post?.feature_image?.formats?.small;
</script>

<div class="card mb-4 mr-4 relative">
  <h2 class="absolute bottom-0 block bg-gray-200 w-full text-sm font-semibold">{post.title}</h2>
  {#if tizer}
    <img width="{ Math.round(200 / +tizer.height * +tizer.width)}" height={200} src={tizer.url} alt="{post.title}" />
  {/if}
</div>

<style>
.card {
  min-height: 200px;
  min-width: 100px;
}
.card img {
  height: 200px;
}
</style>