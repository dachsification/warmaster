<template>
  <v-btn v-model="locale" icon="mdi-web" @click="changelocals()" />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLanguageStore } from '../store/language';

const { locale } = useI18n();
const languageStore = useLanguageStore();
const { changeLanguage } = languageStore;

function changelocals() {
  locale.value = changeLanguage();
}
</script>
