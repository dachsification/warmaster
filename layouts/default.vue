<template>
  <v-app>
    <application-header />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import ApplicationHeader from '../components/application-header.vue';
</script>
