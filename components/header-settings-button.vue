<template>
  <!-- open-on-hover does not properly work with v-menu -->
  <v-menu>
    <template #activator="{ props }">
      <v-app-bar-nav-icon color="primary" icon="mdi-cog" v-bind="props" />
    </template>
    <v-card>
      <v-list>
        <v-list-item prepend-icon="mdi-account" :title="user" :subtitle="faction" />
      </v-list>
      <v-divider />
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="item.action">
          <template #prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { useThemeStore } from '../store/theme';
import { useLanguageStore } from '../store/language';

const languageStore = useLanguageStore();
const { languageLabel } = storeToRefs(languageStore);
const { changeLanguage } = languageStore;

const theme = useTheme();
const themeStore = useThemeStore();
const { themeIcon, themeLabel } = storeToRefs(themeStore);
const { changeTheme } = themeStore;
function toggleTheme() {
  theme.global.name.value = changeTheme().themeName.value;
}

const items = computed(() => [
  { icon: 'mdi-web', title: languageLabel.value, action: changeLanguage },
  {
    icon: themeIcon.value,
    title: themeLabel.value,
    action: toggleTheme,
  },
]);

const user = ref('User');
const faction = ref('Faction');
</script>
