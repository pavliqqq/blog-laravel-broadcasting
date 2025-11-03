<template>
    <button
        @click="logout"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
    >
        Logout
    </button>
</template>

<script setup>
import router from "../../router/index.js";
import { useAuthStore } from "../../stores/authStore.js";

const authStore = useAuthStore();
async function logout() {
    try {
        const response = await axios.post("/api/logout", null, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });

        if (response) {
            authStore.reset();
            router.go(0);
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }
}
</script>
