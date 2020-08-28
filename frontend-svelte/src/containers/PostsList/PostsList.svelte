<script lang="ts">
  import { onMount } from 'svelte';
  import type { IPost, IPostService } from "../../interfaces";
  import PostCard from "../../components/PostCard/PostCard.svelte";
  import postsStore from '../../stores/posts-store';

  import Showdown from 'Showdown';

  const converter = new Showdown.Converter;

  export let postService: IPostService;

  onMount( async ()=> {
    const res = await fetch(`http://localhost:1337/posts?_limit=30`);
    const data = await res.json() as IPost[];

    const items = data.map(item => {

      let content = converter.makeHtml(item.content);

      const pattern = /(\/uploads\/.*\.(jpg|png|gif))/g;
      item.content = content.replace(pattern, value => {
        return 'http://localhost:1337' + value;
      });

      return item;
    });

    postsStore.setPosts(items);
  });

  let posts: IPost[] = [];

  const fetchPosts = (async () => {
    posts = await postService.getPosts();
	})();
</script>

<section>
  <h2>Posts List</h2>

  {#each $postsStore as post, i}
    <PostCard post={post} />
  {/each}

</section>

<style>

</style>