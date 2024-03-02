<template>
  <v-btn class="text-body-2" :active="false">
    {{ label }}
  </v-btn>
</template>
<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>
