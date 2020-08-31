<script lang="ts">
	import {onMount} from 'svelte';
	import LoginForm from "./components/LoginForm/LoginForm.svelte";
	import PostsList from "./containers/PostsList/PostsList.svelte";
	import type { IAppConfig, IAuthService, IPostService, IUser } from './interfaces';
	import userStore from './stores/user-store';
	import { AuthService, PostService } from './services';
	import { ApolloClient } from "apollo-client";
	import { createHttpLink } from "apollo-link-http";
	import { InMemoryCache } from "apollo-cache-inmemory";

	export let config: IAppConfig;

	const httpLink = createHttpLink({
			uri: config.gqlServerURL,
	});
	const cache = new InMemoryCache();
	const apolloClient = new ApolloClient({
			link: httpLink,
			cache,
	});

	const postService = new PostService(apolloClient, config.mediaLibraryURL);
	const authService = new AuthService(config.authServerURL);

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
	 max-width: 950px;
	 margin: 0 auto;
 }
</style>