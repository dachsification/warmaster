<template>
  <army-content :army-keyword="armykeyword" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'army-layout',
});
const armykeyword = 'tomb-kings';
</script>
