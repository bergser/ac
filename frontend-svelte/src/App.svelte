<script lang="ts">
import LoginForm from "./components/LoginForm/LoginForm.svelte";

import PostsList from "./containers/PostsList/PostsList.svelte";
	import { MockPostService } from "./services";

	export let name: string;

	const postService = new MockPostService();
</script>

<main>
	<LoginForm />
	<PostsList postService={postService} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>