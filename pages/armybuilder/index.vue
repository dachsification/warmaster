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
      <v-col></v-col>
      <v-col cols="auto">
        <v-text-field
          variant="plain"
          readonly
          :model-value="`${currentPoints} / ${selectedArmySize ? selectedArmySize : 'Maximum'}`"
          :class="`centered-input font-weight-bold ${currentPoints > selectedArmySize ? 'text-red' : 'text-black'}`"
          style="min-width: 100px"
        />
      </v-col>
      <v-col
        ><p>{{ minWarning }}</p></v-col
      >
    </v-row>
    <v-row justify="center">
      <v-col cols="7">
        <v-data-table
          :headers="factionHeaders"
          :items="faction.units"
          density="compact"
          item-value="name"
          items-per-page="-1"
          hide-default-footer
          @click:row="addItem"
        >
        </v-data-table>
      </v-col>
      <v-col cols="5">
        <v-data-table
          :headers="armylistHeaders"
          :items="armyList"
          density="compact"
          item-value="name"
          hide-default-footer
          items-per-page="-1"
          :no-data-text="emptyArmylist"
          :row-props="minWarningRow"
          @click:row="removeItem"
        >
        </v-data-table>
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
import TombKings from '../../database/army-builder/tomb-kings-calculator.json';
import Empire from '../../database/army-builder/the-empire-calculator.json';
import Araby from '../../database/army-builder/araby-calculator.json';
import WoodElves from '../../database/army-builder/wood-elves-calculator.json';
import DarkElves from '../../database/army-builder/dark-elves-calculator.json';
import HighElves from '../../database/army-builder/high-elves-calculator.json';
import Chaos from '../../database/army-builder/chaos-calculator.json';
import Orcs from '../../database/army-builder/orcs-calculator.json';
import Dwarfs from '../../database/army-builder/dwarfs-calculator.json';
import Skaven from '../../database/army-builder/skaven-calculator.json';
import Lizardmen from '../../database/army-builder/lizardmen-calculator.json';
import Bretonnia from '../../database/army-builder/bretonnia-calculator.json';
import Kislev from '../../database/army-builder/kislev-calculator.json';
import Daemons from '../../database/army-builder/daemons-calculator.json';
import Vampire from '../../database/army-builder/vampire-counts-calculator.json';
import DogsOfWar from '../../database/army-builder/dogs-of-war-calculator.json';
import Ogre from '../../database/army-builder/ogre-kingdom-calculator.json';
import Albion from '../../database/army-builder/albion-calculator.json';
import Goblin from '../../database/army-builder/goblin-calculator.json';
import WitchHunter from '../../database/army-builder/witch-hunter-calculator.json';
import Beastmen from '../../database/army-builder/beastmen-calculator.json';
import Norse from '../../database/army-builder/norse-calculator.json';
import Cathay from '../../database/army-builder/cathay-calculator.json';
import Nippon from '../../database/army-builder/nippon-calculator.json';
import Ror from '../../database/army-builder/ror-calculator.json';
import ChaosDwarfs from '../../database/army-builder/chaos-dwarfs-calculator.json';
import Fallback from '../../database/army-builder/fallback-army-calculator.json';

// Table Headers
const factionHeaders = ref([
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

const armylistHeaders = ref([
  {
    title: 'Quantity',
    align: 'center',
    key: 'quantity',
  },
  {
    title: 'Name',
    align: 'start',
    key: 'name',
  },
  // {
  //   title: 'Min',
  //   align: 'start',
  //   key: 'min',
  // },
  // {
  //   title: 'Max',
  //   align: 'start',
  //   key: 'max',
  // },
  {
    title: 'Points',
    align: 'center',
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
const emptyArmylist = 'No Units Selected - Armylist is empty';
// Points
const currentPoints = ref(0);
// Armeeliste
const armyList = ref<UnitForCalculator[]>([]);

// Armies
const tombKingArmy = TombKings;
const empireArmy = Empire;
const arabyArmy = Araby;
const woodElvesArmy = WoodElves;
const darkElvesArmy = DarkElves;
const highElvesArmy = HighElves;
const chaosArmy = Chaos;
const orcsArmy = Orcs;
const dwarfsArmy = Dwarfs;
const skavenArmy = Skaven;
const lizardmenArmy = Lizardmen;
const bretonniaArmy = Bretonnia;
const kislevArmy = Kislev;
const daemonsArmy = Daemons;
const vampireArmy = Vampire;
const dogsOfWarArmy = DogsOfWar;
const ogreArmy = Ogre;
const albionArmy = Albion;
const goblinArmy = Goblin;
const witchHunterArmy = WitchHunter;
const beastmenArmy = Beastmen;
const norseArmy = Norse;
const cathayArmy = Cathay;
const nipponArmy = Nippon;
const rorArmy = Ror;
const chaosDwarfsArmy = ChaosDwarfs;
const FallbackArmy = Fallback;

// Faction-Switch-Case to fill table
const faction = computed(() => {
  switch (selectedFaction.value.toLowerCase()) {
    case 'tomb kings':
      return tombKingArmy;
    case 'araby':
      return arabyArmy;
    case 'the empire':
      return empireArmy;
    case 'beastmen':
      return beastmenArmy;
    case 'kislev':
      return kislevArmy;
    case 'wood elves':
      return woodElvesArmy;
    case 'dark elves':
      return darkElvesArmy;
    case 'orcs':
      return orcsArmy;
    case 'high elves':
      return highElvesArmy;
    case 'chaos':
      return chaosArmy;
    case 'dwarfs':
      return dwarfsArmy;
    case 'skaven':
      return skavenArmy;
    case 'lizardmen':
      return lizardmenArmy;
    case 'bretonnia':
      return bretonniaArmy;
    case 'daemons':
      return daemonsArmy;
    case 'vampire counts':
      return vampireArmy;
    case 'dogs of war':
      return dogsOfWarArmy;
    case 'ogre kingdoms':
      return ogreArmy;
    case 'albion':
      return albionArmy;
    case 'goblins':
      return goblinArmy;
    case 'witch hunters':
      return witchHunterArmy;
    case 'norse':
      return norseArmy;
    case 'cathay':
      return cathayArmy;
    case 'nippon':
      return nipponArmy;
    case 'ror':
      return rorArmy;
    case 'chaos dwarfs':
      return chaosDwarfsArmy;
    default:
      return FallbackArmy;
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
        armyList.value.forEach((unit) => {
          if (unit.name === existingEntry.name) {
            if (typeof unit.max === 'number' && isMax(unit.max, unit.quantity, unit.min)) {
              addExistingArmylistEntry(unit, selectedUnit.points);
            }
            if (typeof unit.max === 'string') {
              addExistingArmylistEntry(unit, selectedUnit.points);
            }
          }
        });
      } else addNewArmylistEntry(armyList.value, selectedUnit);
    } else {
      addNewArmylistEntry(armyList.value, selectedUnit);
    }
  }
}

function calculateRemoving(test: any, points: number) {
  test.quantity--;
  test.points -= points;
  reducePoints(points);
}

function removeItem(_event: PointerEvent, row: any) {
  const selectedUnit: UnitForCalculator = { ...row.item };
  const pointsPerUnit = selectedUnit.points / selectedUnit.quantity;
  if (typeof selectedUnit.min === 'number') {
    if (selectedUnit.quantity > selectedUnit.min) {
      armyList.value.forEach((unit) => {
        if (unit.name === selectedUnit.name) {
          calculateRemoving(unit, pointsPerUnit);
        }
      });
    }
  } else if (selectedUnit.quantity > 1) {
    armyList.value.forEach((unit) => {
      if (unit.name === selectedUnit.name) {
        calculateRemoving(unit, pointsPerUnit);
      }
    });
  } else {
    armyList.value.splice(row.index, 1);
    reducePoints(pointsPerUnit);
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
  const armysizeMultiplier = Number(modelValue.charAt(0));
  const minUnitList = faction.value.units.filter((e) => typeof e.min === 'number').map((r) => ({ ...r }));
  minUnitList.forEach((e) => {
    if (typeof e.min === 'number') {
      const requiredMin = isNotGeneral(e.min, e.max) ? e.min * armysizeMultiplier : 1;
      e.quantity *= requiredMin;
      e.points *= requiredMin;
      addPoints(e.points);
    }
  });
  armyList.value = minUnitList;
  findStupidRule(armysizeMultiplier, armyList.value);
  console.log(minWarningRow(armyList.value));
  console.log('armyList.value', armyList.value);
  minWarningRow(armyList.value);
}

const stupidUnit = ref('');
const test = ref(false);
const minWarning = computed(() => (test.value ? `${stupidUnit.value} missing` : ''));

function findStupidRule(armySize: number, minUnitList: UnitForCalculator[]) {
  const stupidArmiesWithStupidRule = ['the empire', 'dwarfs', 'chaos dwarfs', 'dogs of war', 'cathay', 'goblins'];
  const onlyForStupidArmies = stupidArmiesWithStupidRule.includes(faction.value.faction);
  if (onlyForStupidArmies) {
    if (selectedFaction.value === 'The Empire' || selectedFaction.value === 'Dogs of War') {
      stupidUnit.value = 'Crossbowmen';
      test.value = true;
    }
    if (selectedFaction.value === 'Dwarfs') {
      stupidUnit.value = 'Warriors';
    }
    if (selectedFaction.value === 'Goblins') {
      stupidUnit.value = 'Goblins';
      armySize *= 2;
    }
    if (selectedFaction.value === 'Chaos Dwarfs') {
      stupidUnit.value = 'Chaos Dwarfs';
    }
    if (selectedFaction.value === 'Cathay') {
      stupidUnit.value = 'Crossbows';
    }
    minUnitList?.forEach((e) => {
      if (e.name === stupidUnit.value) {
        const pointsPerUnit = (e.points / e.quantity) * armySize;
        e.points -= pointsPerUnit;
        e.quantity -= armySize;
        reducePoints(pointsPerUnit);
      }
    });
  }
}
function minWarningRow(units: any[]) {
  console.log('UNIT', units);
  units.forEach((e: any) => {
    if (typeof e.min === 'number') {
      console.log('test');
      console.log(e.min);
      console.log(e.quantity);
      if (e.min > e.quantity) {
        console.log('test2');
        return { style: 'color: red!important' };
      }
    }
  });
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
