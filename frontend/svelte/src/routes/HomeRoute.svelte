<script lang="ts">
  import type { IPostService } from "../shared/interfaces";
  import PostsList from '../containers/PostsList/PostsList.svelte';
  export let params: {
    postService: IPostService
  };
</script>
<section>
    <PostsList postService={params.postService} />
</section>