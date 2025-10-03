<script lang="ts" setup>
const { $db } = useNuxtApp();
const posts = ref<{ title: string }[]>([]);

async function getPosts() {
  const { data } = await $db.from("posts").select();
  posts.value = data ?? [];
}

onMounted(() => {
  getPosts();
});
</script>

<template>
  <UPage>
    <u-card>
      <ul>
        <li v-for="value in posts">
          <UButton>{{ value.title }}</UButton>
        </li>
      </ul>
    </u-card>
  </UPage>
</template>
