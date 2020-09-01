<script lang="ts">
	import {onMount} from 'svelte';
	import LoginForm from "./components/LoginForm/LoginForm.svelte";
	import PostsList from "./containers/PostsList/PostsList.svelte";
	import type { IAppConfig, IAuthService, IPostService, IUser } from '../../shared/interfaces';
	import userStore from './stores/user-store';
	import { AuthService, PostService } from './services';
	import { ApolloClient } from "apollo-client";
	import { createHttpLink } from "apollo-link-http";
	import type { HttpOptions } from "apollo-link-http-common";
	import { InMemoryCache } from "apollo-cache-inmemory";

	export let config: IAppConfig;

	const authService: IAuthService = new AuthService(config.authServerURL);
	let postService: IPostService = null;

	onMount(async() => {
		const loggedUser = await authService.authenticate();
		userStore.setUser(loggedUser);

		const jwt = authService.getToken();

		const linkOptions: HttpOptions = {
			uri: config.gqlServerURL
		};

		if (jwt) {
			linkOptions.headers = {
				Authorization:
					`Bearer ${jwt}`,
			}
		}

		const httpLink = createHttpLink(linkOptions);

		const cache = new InMemoryCache();
		const apolloClient = new ApolloClient({
				link: httpLink,
				cache,
		});
		postService = new PostService(apolloClient, config.mediaLibraryURL);
	});
</script>

<main>
	<LoginForm authService={authService} />

	{#if postService}
		<PostsList postService={postService} />
	{/if}

</main>

<style>
 main {
	 max-width: 950px;
	 margin: 0 auto;
 }
</style>