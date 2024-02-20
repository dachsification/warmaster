<template>
  <v-btn
    :icon="themeName === 'customLightTheme' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
    class="mr-2"
    @click="toggleTheme" />
</template>
<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useThemeStore } from '../store/theme';

const theme = useTheme();
const themeStore = useThemeStore();
const { themeName } = storeToRefs(themeStore);
const { changeTheme } = themeStore;

function toggleTheme() {
  theme.global.name.value = changeTheme();
}
</script>
