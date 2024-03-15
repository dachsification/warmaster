<template>
  <v-btn
    color="primary"
    :to="urlPath"
    :active="false"
  >
    {{ label }}
  </v-btn>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    urlPath: string;
    label: string;
  }>(),
  {
    label: 'label',
    urlPath: 'urlPath',
  },
);
</script>
