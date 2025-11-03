<template>
    <textarea
        :name="name"
        :placeholder="placeholder"
        v-model="model"
        class="border p-2 min-w-75 rounded outline-none focus-within:border-gray-800 focus:border-gray-800"
    >
    </textarea>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    name: String,
    placeholder: String,
    modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});
</script>
