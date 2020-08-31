import App from './App.svelte';
import { AuthService } from './services';
import type { IAppConfig } from './interfaces';

const config: IAppConfig =  {
	gqlServerURL: 'http://localhost:1337/graphql',
	authServerURL: 'http://localhost:1337',
	mediaLibraryURL: 'http://localhost:1337/'
}

const app = new App({
	target: document.body,
	props: {
		config
	}
});

export default app;