<script setup lang="ts">
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
await userStore.fetchUser();
</script>

<template>
  <div>
    <UContainer class="sm:border-x border-default pt-10">
      <slot />
      <LoginForm v-if="!user" />
      <div v-else>
        <UButton @click="userStore.signOut">Sign out</UButton>
      </div>
    </UContainer>
  </div>
</template>
