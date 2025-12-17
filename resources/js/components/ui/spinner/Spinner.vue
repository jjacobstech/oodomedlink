<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Loader2Icon } from "lucide-vue-next"
import { LoaderPinwheelIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <LoaderPinwheelIcon role="status" aria-label="Loading" :class="cn('size-4 animate-spin', props.class)" />
</template>
