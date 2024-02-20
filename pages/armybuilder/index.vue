<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-select
          v-model="select"
          label="Select Army"
          :items="armies"
          item-title="title"
          item-value="title"
          variant="solo" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <p>v-data-table</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import Armies from '../../database/armies.json';
const armies = Armies.armies;
const select = ref('');
</script>
