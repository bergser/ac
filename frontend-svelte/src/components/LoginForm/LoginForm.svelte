<script lang="ts">
  import type { IUserCredentials } from "../../interfaces";

  let userCredentials: IUserCredentials;
  const sendAuthRequest = () => {
    
  }
</script>

<div>
  <form on:submit|preventDefault={sendAuthRequest} action="http://localhost:1337/auth/local">
    <input bind:value={userCredentials.identifier} name="identifier" type="text" />
    <input bind:value={userCredentials.password} name="password" type="password" />
    <button type="submit">Login</button>
  </form>
</div>

<style>

</style>