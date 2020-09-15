<script lang="ts">
import type { ITag, ITagService } from "../../shared/interfaces";

export let tagService: ITagService;

let searchString: string = "";
let tagsArray: ITag[] = [];

const onFormSubmit = async () => {
  tagsArray = await tagService.findTagsByName(searchString);
}
</script>
<div class="border-gray-600">
  <form on:submit|preventDefault="{onFormSubmit}">
    <input type="text" bind:value="{searchString}" />
  </form>
  {#each tagsArray as tag}
    <a href="t/{tag.slug}">
      {tag.name}
    </a>    
  {/each}
</div>