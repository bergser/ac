<script lang="ts">
  import type { IAuthService, IUserCredentials } from "../../shared/interfaces";
  import { AuthService } from "../../services/AuthService";
  import userStore from '../../stores/user-store';
  
  export let authService: IAuthService;

  let userCredentials: IUserCredentials = {
    identifier: "",
    password: ""
  };

  const login = () => {
    (async () => {
      const user = await authService.login(userCredentials);
      userStore.setUser(user);
    })();
  }

  const logout = () => {
    (async ()=> {
      authService.logout();
      userStore.setUser(null);
    })();
  }
</script>

<div>
  {#if $userStore}
    Hi! {$userStore.username}
    <button on:click|preventDefault={logout}>Logout</button>
  {:else}
    <form on:submit|preventDefault={login} action="http://localhost:1337/auth/local">
      <input bind:value={userCredentials.identifier} name="identifier" type="text" />
      <input bind:value={userCredentials.password} name="password" type="password" />
      <button type="submit">Login</button>
    </form>
  {/if}

</div>

<style>

</style>