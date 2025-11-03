<template>
    <div id="app">
        <div v-if="isAuth" class="flex justify-between px-3 mt-3">
            <div class="text-lg">Online users: {{ usersCount }}</div>
            <div>
                <LogoutButton />
            </div>
        </div>
        <div v-else class="mt-3 mr-3 flex justify-end gap-5">
            <router-link
                to="/register"
                class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer"
            >
                Register
            </router-link>
            <router-link
                to="/login"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
                Login
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import LogoutButton from "./components/Auth/LogoutButton.vue";
import { useAuthStore } from "./stores/authStore.js";
import { computed, ref, watchEffect } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const authStore = useAuthStore();
const isAuth = computed(() => !!authStore.token);
const usersCount = ref(null);

watchEffect(() => {
    if (authStore.userId && authStore.token) {
        window.Echo.connector.options.auth.headers.Authorization =
            "Bearer " + authStore.token;

        Echo.private("users." + authStore.userId).listen(
            "NewCommentNotification",
            (e) => {
                toast(`New comment on your post: ${e.comment.content}`, {
                    theme: "dark",
                    type: "info",
                    transition: "slide",
                    autoClose: 5000,
                });
            },
        );

        Echo.join("room")
            .here((users) => {
                usersCount.value = users.length;
            })
            .joining((user) => {
                usersCount.value++;
                toast(`User joined: ${user.name}`, {
                    theme: "dark",
                    type: "info",
                    transition: "slide",
                    autoClose: 5000,
                });
            })
            .leaving((user) => {
                if (usersCount.value > 0) {
                    usersCount.value--;
                }
                toast(`user left: ${user.name}`, {
                    theme: "dark",
                    type: "info",
                    transition: "slide",
                    autoClose: 5000,
                });
            });
    }
});
</script>
