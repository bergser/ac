<script lang="ts">
	import {onMount} from 'svelte';
	import LoginForm from "./components/LoginForm/LoginForm.svelte";
	import PostsList from "./containers/PostsList/PostsList.svelte";
	import type { IAuthService, IPostService, IUser } from './interfaces';

	import userStore from './stores/user-store';

	export let authService: IAuthService;
	export let postService: IPostService;

	onMount(async() => {
		const loggedUser = await authService.authorize();
		userStore.setUser(loggedUser);
	});
</script>

<main>
	<LoginForm authService={authService} />
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