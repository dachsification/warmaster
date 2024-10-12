<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="3">
        <v-select
          v-model="selectedFaction"
          label="Select Army"
          :items="itemsForFactionSelect"
          :disabled="disableSelectedFaction"
          item-title="title"
          item-value="title"
          variant="solo"
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="selectedArmySize"
          label="Select Points"
          :items="itemsForPointSelect"
          :disabled="disableSelectArmySize"
          variant="solo"
          @update:model-value="addMinUnits"
        />
      </v-col>
    </v-row>

    <v-row
      justify="center"
      class="d-flex align-center"
    >
      <v-col cols="auto">
        <v-text-field
          variant="plain"
          readonly
          :model-value="`${currentPoints} / ${selectedArmySize ? selectedArmySize : 'Maximum'}`"
          :class="`centered-input font-weight-bold ${currentPoints > selectedArmySize ? 'text-red' : 'text-black'}`"
          style="min-width: 100px"
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="7">
        <v-data-table
          :headers="headers"
          :items="faction"
          density="compact"
          item-value="name"
          items-per-page="25"
          @click:row="addItem"
        >
          <template #bottom />
        </v-data-table>
      </v-col>
      <v-col cols="5">
        <v-list style="padding: 0px">
          <v-list-subheader class="font-weight-bold">Army List</v-list-subheader>
          <v-divider></v-divider>
          <v-list-item
            v-for="(item, index) in armyList"
            :key="index"
            v-model="armyList"
            @click="removeItem(index, item)"
          >
            {{ item.quantity }} - {{ item.name }} - {{ item.points }}</v-list-item
          >
        </v-list>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn @click="reset"> Reset </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import Armies from '../../database/armies-overview.json';
import TombKings from '../../database/tomb-kings-calculator.json';
import Empire from '../../database/the-empire-calculator.json';
// import WoodElves from '../../database/wood-elves-calculator.json';
// import DarkElves from '../../database/dark-elves-calculator.json';
// import HighElves from '../../database/high-elves-calculator.json';
// import Chaos from '../../database/chaos-calculator.json';
// import Orcs from '../../database/orcs-calculator.json';
// import Dwarfs from '../../database/dwarfs-calculator.json';
// import Skaven from '../../database/skaven-calculator.json';
// import Lizardmen from '../../database/lizardmen-calculator.json';
// import Bretonnia from '../../database/bretonnia-calculator.json';
// import Kislev from '../../database/kislev-calculator.json';
// import Daemons from '../../database/daemons-calculator.json';
// import Vampire from '../../database/vampire-counts-calculator.json';
// import DogsOfWar from '../../database/dogs-of-war-calculator.json';
// import Ogre from '../../database/ogre-kingdom-calculator.json';
// import Albion from '../../database/albion-calculator.json';
// import Goblin from '../../database/goblin-calculator.json';
// import WitchHunter from '../../database/witch-hunter-calculator.json';
// import Beastmen from '../../database/beastmen-calculator.json';
// import Norse from '../../database/norse-calculator.json';
// import Cathay from '../../database/cathay-calculator.json';
// import Nippon from '../../database/nippon-calculator.json';
// import Ror from '../../database/ror-calculator.json';
// import ChaosDwarfs from '../../database/chaos-dwarfs-calculator.json';
import FallbackArmy from '../../database/fallback-army-calculator.json';

// Table Headers
const headers = ref([
  {
    title: 'Name',
    align: 'start',
    key: 'name',
  },
  {
    title: 'Min',
    align: 'start',
    key: 'min',
  },
  {
    title: 'Max',
    align: 'start',
    key: 'max',
  },
  {
    title: 'Points',
    align: 'start',
    key: 'points',
  },
] as const);

// Selects & Button
const itemsForFactionSelect = Armies.armies;
const itemsForPointSelect = ['1000', '1250', '1500', '2000'];
const selectedFaction = ref('');
const selectedArmySize = ref();
const disableSelectArmySize = ref(true);
const disableSelectedFaction = ref(false);

// Points
const currentPoints = ref(0);
// Armeeliste
const armyList = ref<UnitForCalculator[]>([]);

// Armies
const tombKingArmy = TombKings;
const empireArmy = Empire;
// const woodElvesArmy = WoodElves;
// const darkElvesArmy = DarkElves;
// const highElvesArmy = HighElves;
// const chaosArmy = Chaos;
// const orcsArmy = Orcs;
// const dwarfsArmy = Dwarfs;
// const skavenArmy = Skaven;
// const lizardmenArmy = Lizardmen;
// const bretonniaArmy = Bretonnia;
// const kislevArmy = Kislev;
// const daemonsArmy = Daemons;
// const vampireArmy = Vampire;
// const dogsOfWarArmy = DogsOfWar;
// const ogreArmy = Ogre;
// const albionArmy = Albion;
// const goblinArmy = Goblin;
// const witchHunterArmy = WitchHunter;
// const beastmenArmy = Beastmen;
// const norseArmy = Norse;
// const cathayArmy = Cathay;
// const nipponArmy = Nippon;
// const rorArmy = Ror;
// const chaosDwarfsArmy = ChaosDwarfs;

// Faction-Switch-Case to fill table
const faction = computed(() => {
  switch (selectedFaction.value.toLowerCase()) {
    case 'tomb kings':
      return tombKingArmy.units;
    case 'the empire':
      return empireArmy.units;
    //     // case 'wood elves':
    //     //   return woodElvesArmy.units;
    //     // case 'dark elves':
    //     //   return darkElvesArmy.units;
    //     // case 'wood elves':
    //     //   return woodElvesArmy.units;
    //     // case 'high elves':
    //     //   return highElvesArmy.units;
    //     // case 'chaos':
    //     //   return chaosArmy.units;
    //     // case 'dwarfs':
    //     //   return dwarfsArmy.units;
    //     // case 'skaven':
    //     //   return skavenArmy.units;
    //     // case 'lizardmen':
    //     //   return lizardmenArmy.units;
    //     // case 'bretonnia':
    //     //   return bretonniaArmy.units;
    //     // case 'daemons':
    //     //   return daemonsArmy.units;
    //     // case 'vampire':
    //     //   return vampireArmy.units;
    //     // case 'dogsOfWar':
    //     //   return dogsOfWarArmy.units;
    //     // case 'ogre':
    //     //   return ogreArmy.units;
    //     // case 'albion':
    //     //   return albionArmy.units;
    //     // case 'goblin':
    //     //   return goblinArmy.units;
    //     // case 'witchHunter':
    //     //   return witchHunterArmy.units;
    //     // case 'norse':
    //     //   return norseArmy.units;
    //     // case 'cathay':
    //     //   return cathayArmy.units;
    //     // case 'nippon':
    //     //   return nipponArmy.units;
    //     // case 'ror':
    //     //   return rorArmy.units;
    //     // case 'chaosDwarfs':
    //     //   return chaosDwarfsArmy.units;
    default:
      return FallbackArmy.units;
  }
});

// Reset Points, Armylist and MinButton
watch(
  () => selectedFaction.value,
  () => {
    currentPoints.value = 0;
    armyList.value = [];
    disableSelectArmySize.value = false;
    selectedArmySize.value = undefined;
  },
);

function isNotGeneral(min: number | string, max: number | string) {
  return !(min === 1 && max === 1);
}

function addPoints(points: number) {
  currentPoints.value += points;
}

function reducePoints(points: number) {
  currentPoints.value -= points;
}

function addNewArmylistEntry(armylist: UnitForCalculator[], unit: UnitForCalculator) {
  armylist.push(unit);
  addPoints(unit.points);
}

function addExistingArmylistEntry(armylistEntry: UnitForCalculator, points: number) {
  armylistEntry.quantity++;
  armylistEntry.points += points;
  addPoints(points);
}

function isMax(unitLimit: number, numberOfUnits: number, unitMin: number | string) {
  if (selectedArmySize.value !== '2000') {
    return numberOfUnits !== unitLimit;
  } else return numberOfUnits !== unitLimit * 2 && isNotGeneral(unitMin, unitLimit);
}

function addItem(_event: PointerEvent, row: any) {
  if (selectedArmySize.value) {
    const selectedUnit: UnitForCalculator = { ...row.item };
    if (armyList.value.length) {
      const existingEntry = armyList.value.find((a) => a.name === selectedUnit.name);
      if (existingEntry) {
        armyList.value.forEach((entry) => {
          if (entry.name === existingEntry.name) {
            if (typeof entry.max === 'number' && isMax(entry.max, entry.quantity, entry.min)) {
              addExistingArmylistEntry(entry, selectedUnit.points);
            }
            if (typeof entry.max === 'string') {
              addExistingArmylistEntry(entry, selectedUnit.points);
            }
          }
        });
      } else addNewArmylistEntry(armyList.value, selectedUnit);
    } else {
      addNewArmylistEntry(armyList.value, selectedUnit);
    }
  }
}

function removeItem(index: number, item: UnitForCalculator) {
  const points = item.points / item.quantity;
  if (typeof armyList.value[index].min === 'number') {
    if (armyList.value[index].quantity > armyList.value[index].min) {
      armyList.value[index].quantity--;
      armyList.value[index].points -= points;
      reducePoints(points);
    }
  } else if (armyList.value[index].quantity > 1) {
    armyList.value[index].quantity--;
    armyList.value[index].points -= points;
    reducePoints(points);
  } else {
    armyList.value.splice(index, 1);
    reducePoints(points);
  }
}

function reset() {
  disableSelectedFaction.value = false;
  disableSelectArmySize.value = true;
  currentPoints.value = 0;
  armyList.value = [];
  selectedArmySize.value = undefined;
  selectedFaction.value = '';
}

function addMinUnits(modelValue: any) {
  disableSelectArmySize.value = true;
  disableSelectedFaction.value = true;
  const minUnitList = faction.value.filter((e) => typeof e.min === 'number').map((r) => ({ ...r }));
  minUnitList.forEach((e) => {
    if (typeof e.min === 'number') {
      const requiredMin = isNotGeneral(e.min, e.max) ? e.min * Number(modelValue.charAt(0)) : 1;
      e.quantity *= requiredMin;
      e.points *= requiredMin;
      addPoints(e.points);
    }
  });
  armyList.value = minUnitList;
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
