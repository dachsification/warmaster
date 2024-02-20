<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="auto">
        <p>Title</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <mainpage-button :label="armyKeyword" :url-path="`${armyKeyword}-army`" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <army-introduction />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <army-rules />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto">
        <p>Tactics</p>
      </v-col>
    </v-row>
    <inner-sidebar location="right" :army-keyword="armyKeyword" page-type="armies" />
  </v-container>
</template>
<script setup lang="ts">
defineProps<{ armyKeyword: any }>();
</script>
