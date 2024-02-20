<template>
  <div>
    <p>{{ loremIsum[300] }}</p>
  </div>
</template>
<script setup lang="ts">
import LoremIpsum from '../database/loremIpsum.json';
const loremIsum = LoremIpsum;
</script>
