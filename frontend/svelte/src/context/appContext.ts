import { getContext, setContext } from "svelte"
import type { IAppContext } from "../shared/interfaces"

const appContextKey = 'appContext';

export const setAppContext = (appContext: IAppContext) => {
  setContext(appContextKey, appContext)
}

export const getAppContext = (): IAppContext => {
  return getContext(appContextKey);
}