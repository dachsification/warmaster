<template>
  <!-- open-on-hover does not properly work with v-menu -->
  <v-menu>
    <template #activator="{ props }">
      <v-btn color="primary" v-bind="props" append-icon="mdi-menu-down">
        {{ label }}
      </v-btn>
    </template>
    <v-card>
      <v-list density="compact">
        <v-list-item v-for="item in data" :key="item.urlPath" :to="item.urlPath">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    data: any;
    title?: string;
    urlPath?: string;
    label: string;
    isNavMenu?: boolean;
  }>(),
  {
    title: 'title',
    urlPath: 'urlPath',
  },
);
</script>
