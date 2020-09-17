<script lang="ts">
  import type { IPost } from "../../shared/interfaces";
  export let post: IPost;

  const tizer = post?.feature_image?.formats?.small;

  const boxHeight: number = 200;
  const boxWidth: number = tizer ? Math.round(200 / +tizer.height * +tizer.width) : 200;
</script>

<div class="card mb-16 mr-16 relative">
  {#if tizer}
    <img data-src={tizer.url} class="lazy" alt="{post.title}" />
  {/if}
  <h2 class="block text-sm font-semibold  text-center text-gray-500 font-thin">{@html post.title}</h2>
</div>

<style>
.card {
  max-width: 350px;
}
.card img {
  width: 100%;
}
h2 {
  max-width: 100%;
  overflow: hidden;
}
</style>