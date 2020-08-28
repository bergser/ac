<script lang="ts">
  import type { IPost } from "../../interfaces";
	export let post: IPost;
</script>

<div>
	<h1>Post: {post.title}</h1>
  <div>{post.content}</div>
</div>

<style>

</style>