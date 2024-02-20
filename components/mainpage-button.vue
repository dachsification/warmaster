<template>
  <v-btn
    v-bind="$attrs"
    width="250px"
    height="50px"
    color="primary"
    rounded="lg"
    size="x-large"
    variant="outlined"
    :to="urlPath">
    {{ label }}
  </v-btn>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    urlPath?: string;
  }>(),
  {
    label: 'title',
    urlPath: 'urlPath',
  },
);
</script>
