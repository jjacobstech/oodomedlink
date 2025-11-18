<template>
    <div
        class="focus-within:ring-deepgreen flex items-center rounded-lg border border-gray-300 text-xl transition-all focus-within:border-transparent focus-within:ring-2"
    >
        <input
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :type="passwordVisible ? 'text' : 'password'"
            :placeholder="placeholder"
            class="w-[85%] rounded-l-lg border-none px-4 py-2.5 text-xl focus:outline-none focus:ring-0"
            required
        />
        <div class="px-auto flex w-[15%] items-center justify-center">
            <EyeIcon
                v-if="passwordVisible"
                class="text-deepgreen hover:text-deepgreen/80 h-5 w-5 cursor-pointer transition-colors"
                @click="passwordVisible = !passwordVisible"
            />
            <EyeClosed
                v-else
                class="text-deepgreen hover:text-deepgreen/80 h-5 w-5 cursor-pointer transition-colors"
                @click="passwordVisible = !passwordVisible"
            />
        </div>
    </div>
</template>

<script setup lang="js">
import { EyeClosed, EyeIcon } from 'lucide-vue-next';
import { ref } from 'vue';

const passwordVisible = ref(false);

defineProps({
    modelValue: '',
    placeholder: '',
});

defineEmits({
    'update:modelValue': { value: '' },
});
</script>
