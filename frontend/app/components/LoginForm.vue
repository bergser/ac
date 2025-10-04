<script lang="ts" setup>
const password = ref("");
const email = ref("");
const { authenticate } = useUserStore();
</script>
<template>
  <UCard>
    <form @submit.prevent="authenticate(email, password)">
      <UInput v-model="email" />
      <UInput type="password" v-model="password" />
      <UButton type="submit" label="Login" />
    </form>
  </UCard>
</template>
