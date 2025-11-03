import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
    "auth",
    () => {
        const token = ref(null);
        const userId = ref(null);
        function setAuth(data) {
            token.value = data.token;
            userId.value = data.user_id;
        }
        function reset() {
            token.value = "";
            userId.value = "";
        }

        return { token, userId, setAuth, reset };
    },
    {
        persist: {
            storage: localStorage,
        },
    },
);
