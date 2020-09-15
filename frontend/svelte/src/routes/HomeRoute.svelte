<script lang="ts">
  import type { IPostService, ITagService } from "../shared/interfaces";
  import PostsList from '../containers/PostsList/PostsList.svelte';
  import TagLookup from "../components/TagLookup/TagLookup.svelte";
  export let params: {
    postService: IPostService,
    tagService: ITagService
  };

</script>
<section>
  <TagLookup tagService={params.tagService} />
  <PostsList postService={params.postService} />
</section>