<script lang="ts">
import type { ITag } from "../../shared/interfaces";
import {getAppContext} from '../../context/appContext';
  
const appContext = getAppContext();
const { tagService } = appContext;

let searchString: string = "";
let tagsArray: ITag[] = [];

const onFormSubmit = async () => {
  tagsArray = await tagService.findTagsByName(searchString);
}
</script>
<div class="border-gray-600">
  <form on:submit|preventDefault="{onFormSubmit}">
    <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" bind:value="{searchString}" />
  </form>
  {#each tagsArray as tag}
    <a href="t/{tag.slug}">
      {tag.name}
    </a>    
  {/each}
</div>