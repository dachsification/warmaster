<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="3">
        <v-select
          v-model="selectArmy"
          label="Select Army"
          :items="armies"
          item-title="title"
          item-value="title"
          variant="solo"
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="selectPoints"
          label="Select Points"
          :items="points"
          variant="solo"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-text-field
          variant="plain"
          readonly
          :model-value="`${counter} / ${selectPoints}`"
          class="centered-input"
          style="min-width: 100px"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-data-table
          :headers="headers"
          :items="units"
          density="compact"
          item-value="name"
          items-per-page="25"
          @click:row="addItem"
        >
          <template #bottom />
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-list>
        <v-list-item
          v-for="(item, index) in armyList"
          :key="index"
          v-model="armyList"
        >
          {{ item.name }} - {{ item.points }}</v-list-item
        >
      </v-list>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import Armies from '../../database/armies-overview.json';
import UnitHeaders from '../../database/unit-headers-calculator.json';
import TombKings from '../../database/tomb-kings-calculator.json';
import FallbackArmy from '../../database/fallback-army-calculator.json';
const headers = ref();
headers.value = UnitHeaders.headers;
const armies = Armies.armies;
const points = [1000, 1250, 1500, 2000];
const selectArmy = ref('');
const selectPoints = ref(1000);
const armyList = ref<UnitForCalculator[]>([]);

// Armies
const tombKingArmy = TombKings;
const counter = ref(0);

// Faction-Switch-Case
const faction = computed(() => {
  switch (selectArmy.value.toLowerCase()) {
    case 'tomb kings':
      return tombKingArmy;
    default:
      return FallbackArmy;
  }
});

const units = ref();

watch(
  () => faction.value,
  () => (units.value = faction.value.units),
);

function addItem(event: PointerEvent, row: any) {
  console.log(event);
  armyList.value.push(row.item);
  counter.value += row.item.points;
}
</script>
<style scoped>
.centered-input :deep(input) {
  text-align: center;
}

.v-table :deep(th) {
  padding: 0px 8px !important;
}

.v-table :deep(td) {
  padding: 0px 8px !important;
}
</style>
