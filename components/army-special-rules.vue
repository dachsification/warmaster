<template>
  <v-row justify="center">
    <v-col cols="auto">
      <h2 class="text-primary">{{ $t('labels.armyRules') }}</h2>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="auto">
      <v-card flat>
        <v-card-title class="text-primaryDarken mb-5">{{ armyRuleTitle }}</v-card-title>
        <v-card-text
          v-for="(item, index) in armyRules"
          :key="index"
        >
          {{ item }}</v-card-text
        >
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
defineProps<{
  armyRuleTitle: string;
  armyRules: any;
}>();
</script>
