<template>
    <input
        :name="name"
        :type="type"
        :placeholder="placeholder"
        v-model="model"
        class="border p-2 rounded w-full outline-none border-gray-200 focus:border-gray-800"
    />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    name: String,
    type: { type: String, default: "text" },
    placeholder: String,
    modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
});
</script>
