<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="auto">
        <h1 class="text-primary">{{ factionTitle }}</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <army-data-table :units="units" />
      </v-col>
    </v-row>
    <template v-if="armyRules">
      <army-special-rules :army-rule-title="armyRuleTitle" :army-rules="armyRules" />
    </template>
  </v-container>
</template>
<script setup lang="ts">
import TombKings from '../database/tomb-kings.json';
import Beastmen from '../database/beastmen.json';
import FallbackArmy from '../database/fallback-army.json';

const props = defineProps<{ armyKeyword: string }>();
const factionTitle = props.armyKeyword.replace('-', ' ').toUpperCase();

// Armies
const tombKingArmy = TombKings;
const beastmenArmy = Beastmen;

// Faction-Switch-Case
const faction = computed(() => {
  switch (props.armyKeyword.toLowerCase()) {
    case 'tomb-kings':
      return tombKingArmy;
    case 'beastmen':
      return beastmenArmy;
    default:
      return FallbackArmy;
  }
});

const units = ref(faction.value.units);
const armyRules = ref(faction.value.armyRules);
const armyRuleTitle = ref(faction.value.armyRuleTitle);
</script>
