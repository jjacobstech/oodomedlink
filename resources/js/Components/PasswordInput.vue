<template>
      <div
            class="border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-deepgreen focus-within:border-transparent text-xl transition-all flex items-center">
            <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                  :type="passwordVisible ? 'text' : 'password'" :placeholder="placeholder"
                  class="px-4 py-2.5 border-none focus:outline-none focus:ring-0 w-[85%] text-xl  rounded-l-lg"
                  required />
            <div class="flex items-center justify-center w-[15%] px-auto">
                  <EyeIcon v-if="passwordVisible"
                        class="w-5 h-5 text-deepgreen hover:text-deepgreen/80 transition-colors cursor-pointer"
                        @click="passwordVisible = !passwordVisible" />
                  <EyeClosed v-else
                        class="w-5 h-5 text-deepgreen hover:text-deepgreen/80 transition-colors cursor-pointer"
                        @click="passwordVisible = !passwordVisible" />
            </div>
      </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
import { EyeClosed, EyeIcon } from 'lucide-vue-next';

const passwordVisible = ref(false);

defineProps(
      {
            modelValue: '',
            placeholder: ''
      }
);

defineEmits(
      {
            'update:modelValue': { value: '' },
      }
);
</script>