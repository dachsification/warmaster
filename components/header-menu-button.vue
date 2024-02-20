<template>
  <v-menu open-on-hover transition="scale-transition">
    <template #activator="{ props }">
      <v-btn v-bind="props" append-icon="mdi-menu-down " class="text-body-2" :active="false" @click="emit('click')">
        {{ label }}
        <template #append>
          <v-icon />
        </template>
      </v-btn>
    </template>
    <v-card min-width="300">
      <v-list density="compact">
        <v-list-item v-for="(item, index) in data" :key="index" v-bind="$attrs" :to="item[urlPath]">
          {{ item[title] }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
s
<script setup lang="ts">
withDefaults(
  defineProps<{
    data: any;
    readonly title?: string;
    readonly urlPath?: string;
    label: string;
  }>(),
  {
    title: 'title',
    urlPath: 'urlPath',
  },
);
const emit = defineEmits(['click']);
</script>
