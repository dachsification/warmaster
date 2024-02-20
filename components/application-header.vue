<template>
  <v-app-bar :elevation="2">
    <template #prepend>
      <NuxtLink to="/">
        <v-img width="300" :aspect-ratio="16 / 9" src="https://picsum.photos/300/150?random" alt="Logo" />
      </NuxtLink>
    </template>
    <v-app-bar-title>Warmaster Germany</v-app-bar-title>
    <template #append>
      <header-button :label="$t('labels.learn')" to="/getting-started" />
      <header-menu-button :data="armies" :label="$t('labels.armies')" />
      <header-menu-button :data="rulesList" :label="$t('labels.rules')" />
      <header-button :label="$t('labels.armybuilder')" to="/armybuilder" />
      <header-divider />
      <language-button />
      <header-divider />
      <theme-button />
      <header-divider />
      <login-button />
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import Armies from '../database/armies.json';
const { t: $t } = useI18n();
const armies = Armies.armies;
const rulesList = computed(() => [
  { title: $t('titles.englisch'), urlPath: '/rules/english-rules' },
  { title: $t('titles.german'), urlPath: '/rules/german-rules' },
  { title: $t('titles.iconic'), urlPath: '/rules/iconic-rules' },
]);
</script>
