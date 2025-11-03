<template>
    <div class="mx-auto h-screen text-center">
        <h1 class="text-3xl mb-10">Posts list</h1>
        <ul class="flex flex-col justify-center gap-y-6">
            <li v-for="post in posts" :key="post.id">
                <div class="text-blue-500 hover:text-blue-800">
                    <router-link :to="`/posts/${post.id}`">{{
                        post.title
                    }}</router-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const posts = ref([]);
const usersCount = ref(null);

onMounted(async () => {
    const response = await axios.get("/api/posts");
    posts.value = response.data.data;
});
</script>
