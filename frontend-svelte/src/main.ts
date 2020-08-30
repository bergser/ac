import App from './App.svelte';
import { AuthService, PostService } from './services';

const app = new App({
	target: document.body,
	props: {
		authService: new AuthService('http://localhost:1337'),
		postService: new PostService()
	}
});

export default app;