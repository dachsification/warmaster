<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="3">
        <v-select
          v-model="selectedFaction"
          label="Select Army"
          :items="itemsForFactionSelect"
          :disabled="disableSelectedFaction"
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
      <v-col cols="2" />
      <v-col cols="auto">
        <v-text-field
          variant="plain"
          readonly
          :model-value="pointsCalculation"
          :class="tooMuchPointsWarning"
          style="min-width: 100px"
        />
      </v-col>
      <v-col cols="2" />
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <faction-table
          :selected-faction="selectedFaction"
          @add-unit="addItem"
          @fill-faction="fillFaction"
        />
      </v-col>
      <v-col cols="6">
        <army-list-table
          :is-dialog-open="isDialogOpen"
          :army-list="armyList"
          @remove-item="removeItem"
          @edit-item="editItem"
          @delete-item="deleteItem"
          @add-magic="addMagic"
          @close-dialog="closeDialog"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn @click="resetCalculator"> Reset Armybuilder</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import Armies from '../../database/armies-overview.json';
import ArmyListTable from './army-list-table.vue';
import FactionTable from './faction-table.vue';

const pointsCalculation = computed(() => `${currentPoints.value} / ${selectedArmySize.value || 'Maximum'}`);
const tooMuchPointsWarning = computed(
  () => `centered-input font-weight-bold ${currentPoints.value > selectedArmySize.value ? 'text-red' : ''}`,
);

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

// Reset Points, armyList and MinButton
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

function addNewArmyListEntry(armyList: UnitForCalculator[], unit: UnitForCalculator) {
  armyList.push(unit);
  addPoints(unit.points);
}

function addExistingArmyListEntry(armyListEntry: UnitForCalculator, points: number) {
  armyListEntry.quantity++;
  armyListEntry.points += points;
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
              addExistingArmyListEntry(unit, selectedUnit.points);
            }
            if (typeof unit.max === 'string') {
              addExistingArmyListEntry(unit, selectedUnit.points);
            }
          }
        });
      } else addNewArmyListEntry(armyList.value, selectedUnit);
    } else {
      addNewArmyListEntry(armyList.value, selectedUnit);
    }
  }
}

function calculateRemoving(unit: UnitForCalculator, points: number) {
  unit.quantity--;
  unit.points -= points;
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

function resetCalculator() {
  disableSelectedFaction.value = false;
  disableSelectArmySize.value = true;
  currentPoints.value = 0;
  armyList.value = [];
  selectedArmySize.value = undefined;
  selectedFaction.value = '';
}

const chosenFaction = ref();
function fillFaction(faction: any) {
  chosenFaction.value = faction;
}

function addMinUnits(modelValue: any) {
  disableSelectArmySize.value = true;
  disableSelectedFaction.value = true;
  const armysizeMultiplier = Number(modelValue.charAt(0));
  const minUnitList = chosenFaction.value.units
    .filter((e: any) => typeof e.min === 'number')
    .map((r: any) => ({ ...r }));
  minUnitList.forEach((e: any) => {
    if (typeof e.min === 'number') {
      const requiredMin = isNotGeneral(e.min, e.max) ? e.min * armysizeMultiplier : 1;
      e.quantity *= requiredMin;
      e.points *= requiredMin;
      addPoints(e.points);
    }
  });
  armyList.value = minUnitList;
  findStupidRule(armysizeMultiplier, armyList.value);
}

const stupidUnit = ref('');
function findStupidRule(armySize: number, minUnitList: UnitForCalculator[]) {
  const stupidArmiesWithStupidRule = ['the empire', 'dwarfs', 'chaos dwarfs', 'dogs of war', 'cathay', 'goblins'];
  const onlyForStupidArmies = stupidArmiesWithStupidRule.includes(chosenFaction.value.faction);
  if (onlyForStupidArmies) {
    if (selectedFaction.value === 'The Empire' || selectedFaction.value === 'Dogs of War') {
      stupidUnit.value = 'Crossbowmen';
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

const indexForMagicItem = ref<number>();
const isDialogOpen = ref(false);

function editItem(item: any) {
  isDialogOpen.value = true;
  indexForMagicItem.value = armyList.value.indexOf(item);
}

function deleteItem(item: UnitForCalculator) {
  if (item.magicItem) {
    indexForMagicItem.value = armyList.value.indexOf(item);
    reducePoints(item.magicItem[item.magicItem.length - 1].points);
    armyList.value[indexForMagicItem.value].magicItem?.pop();
  }
}

function closeDialog() {
  isDialogOpen.value = false;
}

function addMagic(magicItem: MagicItem) {
  if (indexForMagicItem.value !== undefined && indexForMagicItem.value !== null) {
    if (magicItem) {
      armyList.value[indexForMagicItem.value].magicItem = [];
      armyList.value[indexForMagicItem.value].magicItem?.push(magicItem);
      addPoints(magicItem.points);
    }
  }
}
</script>
<style scoped>
.centered-input :deep(input) {
  text-align: center;
}
</style>
