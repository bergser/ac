<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();
const supabase = createClient(
  config.public.supabase.url,
  config.public.supabase.key
);
const posts = ref<{ title: string }[]>([]);

async function getPosts() {
  const { data } = await supabase.from("posts").select();
  posts.value = data ?? [];
}

onMounted(() => {
  getPosts();
});
</script>
<template>
  <div>
    <ul>
      <li v-for="value in posts">{{ value.title }}</li>
    </ul>
  </div>
</template>
