<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import LoginForm from "./components/LoginForm/LoginForm.svelte";
	import PostsList from "./containers/PostsList/PostsList.svelte";
	import type { IAppConfig, IAuthService, IPostService, ITagService, IUser } from './shared/interfaces';
	import userStore from './stores/user-store';
	import { AuthService, PostService, TagService } from './services';
	import { ApolloClient } from "apollo-client";
	import { createHttpLink } from "apollo-link-http";
	import type { HttpOptions } from "apollo-link-http-common";
	import { InMemoryCache } from "apollo-cache-inmemory";
	import router from 'page'; // https://blog.jscrambler.com/svelte-routing-with-page-js/
	import HomeRoute from './routes/HomeRoute.svelte';
	import PostRoute from './routes/PostRoute.svelte';
	import NotFoundRoute from './routes/NotFoundRoute.svelte';
	import Loader from './components/Loader/Loader.svelte';
	import {setAppContext} from './context/appContext';

	export let config: IAppConfig;

	const authService: IAuthService = new AuthService(config.authServerURL);

	let page;
	let params;
	router('/', () => page = HomeRoute);
	router('/p/:id', (ctx, next) => {
		params = ctx.params;
		next();
	}, () => page = PostRoute);
	router('*', () => page = NotFoundRoute);
	router.start();

	let status: 'loading' | 'loaded' | 'error' = 'loading';

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

	setAppContext({
		postService: new PostService(apolloClient, config.mediaLibraryURL),
		tagService: new TagService(apolloClient),
		authService
	});

	onMount(async() => {
		try {
			const loggedUser = await authService.authenticate();
			userStore.setUser(loggedUser);
			status = 'loaded';
		} catch (error) {
			console.error(error);
			status = 'error';
		}
	});
</script>

<main>
	{#if status === 'loading'}
		<Loader />
	{:else if status === 'loaded'}
		
		<svelte:component this={page} params={params} />
	{:else if status === 'error'}
		<div>Error!</div>
	{/if}

</main>

<style>
	:global(body) {
		background-color: #111;
	}
</style>