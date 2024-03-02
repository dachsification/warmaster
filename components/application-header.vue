<template>
  <v-app-bar :elevation="2">
    <template #prepend>
      <NuxtLink to="/">
        <v-img width="300" :aspect-ratio="16 / 9" src="https://picsum.photos/300/150?random" alt="Logo" />
      </NuxtLink>
    </template>
    <v-app-bar-title>Warmaster Germany</v-app-bar-title>
    <template #append>
      <v-btn class="text-body-2" :active="false" to="/getting-started">
        {{ $t('labels.learn') }}
      </v-btn>
      <header-menu-button :data="armies" :label="$t('labels.armies')" />
      <header-menu-button :data="rulesList" :label="$t('labels.rules')" />
      <v-btn class="text-body-2" to="/armybuilder" :active="false"> {{ $t('labels.armybuilder') }}</v-btn>
      <v-btn class="text-body-2" to="/guardians" :active="false"> {{ $t('labels.guardians') }}</v-btn>
      <v-btn class="text-body-2" to="/about" :active="false"> {{ $t('labels.about') }}</v-btn>
      <header-divider />
      <header-settings-button />
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import Armies from '../database/armies-overview.json';
const { t: $t } = useI18n();
const armies = Armies.armies;
const rulesList = computed(() => [
  { title: $t('titles.englisch'), urlPath: '/rules/english-rules' },
  { title: $t('titles.german'), urlPath: '/rules/german-rules' },
  // { title: $t('titles.iconic'), urlPath: '/rules/iconic-rules' },
]);
</script>
