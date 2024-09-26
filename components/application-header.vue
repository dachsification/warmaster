<template>
  <app-bar-mobile v-if="isMobile" />
  <app-bar-desktop v-else />
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify';
const { width } = useDisplay();
const isMobile = computed(() => width.value <= 960);
</script>
