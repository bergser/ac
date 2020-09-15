<script lang="ts">
  import type { IPost } from "../../shared/interfaces";
  export let post: IPost;
</script>

<div class="card mb-4 mr-4 relative">
  <h2 class="absolute bottom-0 block bg-gray-200 mb-2 ml-2">{post.title}</h2>
  <img src={post?.feature_image?.formats?.small?.url} alt="{post.title}">
</div>

<style>
.card img {
  height: 200px;
}
h2 {

}
</style>