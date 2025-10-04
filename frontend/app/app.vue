<script setup lang="ts">
const config = useRuntimeConfig();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
<template>
  <UApp>
    <UHeader :title="config.public.name">
      <template #right>
        <UColorModeButton />

        <UAvatar v-if="user" :alt="user.email" size="md" />
      </template>
    </UHeader>
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>
