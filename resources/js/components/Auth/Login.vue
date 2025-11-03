<template>
    <div class="mx-auto my-10 px-4">
        <div class="bg-white shadow rounded p-4 max-w-md mx-auto">
            <h2 class="text-lg text-center mb-4">Login</h2>

            <form @submit.prevent="login" class="flex flex-col gap-4">
                <div>
                    <BaseInput
                        name="email"
                        placeholder="Email"
                        v-model="Data.email"
                    />
                </div>
                <div>
                    <BaseInput
                        name="password"
                        placeholder="Password"
                        v-model="Data.password"
                    />
                </div>

                <div class="text-right pt-6">
                    <button
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import BaseInput from "../../components/UI/BaseInput.vue";
import router from "../../router/index.js";
import { useAuthStore } from "../../stores/authStore.js";

const Data = ref({
    email: "",
    password: "",
});

const authStore = useAuthStore();

async function login() {
    try {
        const response = await axios.post("/api/login", Data.value);
        if (response) {
            authStore.setAuth(response.data);
        }
        await router.push({ name: "posts" });
    } catch (error) {
        console.log("Error with login: ", error);
    }
}
</script>
