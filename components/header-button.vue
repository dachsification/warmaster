<template>
  <v-btn class="text-body-2" :active="false" @click="emit('click')">
    {{ label }}
  </v-btn>
</template>
<script setup lang="ts">
const emit = defineEmits(['click']);
defineProps<{
  label: string;
}>();
</script>
