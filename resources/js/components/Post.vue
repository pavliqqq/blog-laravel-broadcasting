<template>
    <div v-if="post" class="mx-auto text-center px-5">
        <div class="mt-5">
            <p class="text-3xl">Title: {{ post.title }}</p>
        </div>
        <div>
            <p class="text-lg mb-10">Author: {{ post.creator.name }}</p>
        </div>
        <div class="text-xl mb-20 max-w-150 mx-auto">
            Body: {{ post.content }}
        </div>

        <div>
            <p class="text-xl mb-5">Comments</p>
            <button
                v-if="!isCreate"
                class="p-3 rounded bg-blue-500 text-white hover:text-gray-900 cursor-pointer mb-10"
                @click="
                    () => {
                        isCreate = true;
                    }
                "
            >
                Add comment
            </button>
            <div v-if="isCreate">
                <BaseTextArea
                    name="comment"
                    placeholder="Type your comment here"
                    v-model="commentBody"
                >
                </BaseTextArea>
                <div class="flex justify-center gap-5">
                    <button
                        @click="createComment"
                        class="p-3 rounded bg-green-500 text-white hover:text-gray-900 cursor-pointer"
                    >
                        Create
                    </button>
                    <button
                        @click="cancelCreate"
                        class="p-3 rounded bg-gray-400 hover:bg-gray-500 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div class="flex flex-col items-center gap-y-4 mt-10">
                <div
                    v-for="comment in comments"
                    :key="comment.id"
                    class="border border-gray-200 rounded w-100 p-5"
                >
                    <div class="flex justify-between gap-5">
                        <p class="text-md">{{ comment.creator.name }}</p>
                        <p class="text-md text-gray-700">
                            {{ comment.content }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import BaseTextArea from "../components/UI/BaseTextArea.vue";
import {useAuthStore} from "../stores/authStore.js";
import {toast} from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const authStore = useAuthStore();

const route = useRoute();
const postId = route.params.id;

const post = ref(null);
const comments = ref([]);

const isCreate = ref(false);
const commentBody = ref(null);

onMounted(() => {
    getPost();
    getComments();
});

watchEffect((onInvalidate) => {
    if (!postId) {
        return;
    }

    Echo.channel("posts." + postId).listen("NewCommentNotification", (e) => {
        toast(`New comment: ${e.comment.content}`, {
            theme: "dark",
            type: "info",
            transition: "slide",
            autoClose: 5000,
        });
        comments.value.unshift(e.comment);
    });

    onInvalidate(() => {
        Echo.leave("posts." + postId);
    })
})

async function getPost() {
    try {
        const response = await axios.get(`/api/posts/${postId}`);
        post.value = response.data.data;
    } catch (error) {
        console.log("Error while trying to get post", error);
    }
}

async function getComments() {
    try {
        const response = await axios.get(`/api/posts/${postId}/comments`);
        comments.value = response.data.data;
    } catch (error) {
        console.log("Error while trying to get post", error);
    }
}

async function createComment() {
    try {
        await axios.post(
            `/api/posts/${postId}/comments`,
            {content: commentBody.value},
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            },
        );
        isCreate.value = false;
        commentBody.value = "";
    } catch (error) {
        console.log("Error while trying to create post", error);
    }
}

function cancelCreate() {
    isCreate.value = false;
    commentBody.value = "";
}
</script>
