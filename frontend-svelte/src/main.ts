import App from './App.svelte';
import type { IAppConfig } from './interfaces';
import Logger from  'js-logger';

Logger.useDefaults({
	defaultLevel: Logger.TRACE,
});

const config: IAppConfig =  {
	gqlServerURL: 'http://localhost:1337/graphql',
	authServerURL: 'http://localhost:1337',
	mediaLibraryURL: 'http://localhost:1337'
}

const app = new App({
	target: document.body,
	props: {
		config
	}
});

export default app;