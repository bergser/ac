<script lang="ts">
  import type { IPost } from "../../shared/interfaces";
  export let post: IPost;

  const tizer = post?.feature_image?.formats?.small;

  const boxHeight: number = 200;
  const boxWidth: number = tizer ? Math.round(200 / +tizer.height * +tizer.width) : 200;
</script>

<div class="card mb-4 mr-4 relative" style="width: {boxWidth}px;">
  {#if tizer}
    <img width="{boxWidth}" height={200} data-src={tizer.url} class="lazy" alt="{post.title}" />
  {/if}
  <h2 class="block text-sm font-semibold">{@html post.title}</h2>
</div>

<style>
.card {
  min-height: 200px;
  min-width: 100px;
}
.card img {
  height: 200px;
}
h2 {
  max-width: 100%;
  overflow: hidden;
}
</style>