import { createRouter, createWebHistory } from "vue-router";
import PostList from "../components/PostList.vue";
import Post from "../components/Post.vue";
import Register from "../components/Auth/Register.vue";
import Login from "../components/Auth/Login.vue";

const routes = [
    {
        path: "/",
        component: PostList,
        name: "posts",
    },
    {
        path: "/posts/:id",
        component: Post,
        name: "post",
    },
    {
        path: "/register",
        component: Register,
        name: "register",
    },
    {
        path: "/login",
        component: Login,
        name: "login",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
