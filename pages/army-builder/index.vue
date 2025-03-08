<template>
  <army-builder-mobile v-if="isMobile" />
  <army-builder-desktop v-else />
</template>
<script setup lang="ts">
import { useDisplay } from 'vuetify';
import ArmyBuilderDesktop from './army-builder-desktop.vue';
import ArmyBuilderMobile from './army-builder-mobile.vue';

const { width } = useDisplay();
const isMobile = computed(() => width.value <= 690);
// 1279
</script>
