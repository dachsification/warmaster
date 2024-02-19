<template>
  <p>{{ $route.params.armyname }}</p>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.params);
</script>
