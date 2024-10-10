<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="3">
        <v-select
          v-model="selectedFaction"
          label="Select Army"
          :items="itemsForFactionSelect"
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
          variant="solo"
        />
      </v-col>
    </v-row>

    <v-row
      justify="center"
      class="d-flex align-center"
    >
      <v-col cols="2">
        <v-text-field
          variant="plain"
          readonly
          :model-value="`${currentPoints} / ${selectedArmySize}`"
          :class="`centered-input font-weight-bold ${currentPoints > selectedArmySize ? 'text-red' : 'text-black'}`"
          style="min-width: 100px"
        />
      </v-col>
      <v-col cols="2">
        <v-btn
          :disabled="disableButton"
          block
          @click="findMin"
          >Add Min</v-btn
        >
      </v-col>
      <v-col cols="2">
        <p style="text-align: center">Min/Max Checker</p>
        <v-btn @click="checkMinMax"></v-btn>
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

// Selects
const itemsForFactionSelect = Armies.armies;
const itemsForPointSelect = [1000, 1250, 1500, 2000];
const selectedFaction = ref('');
const selectedArmySize = ref(1000);

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

// Points
const currentPoints = ref(0);

// Faction-Switch-Case to fill table
const faction = computed(() => {
  switch (selectedFaction.value.toLowerCase()) {
    case 'tomb kings':
      return tombKingArmy.units;
    case 'the empire':
      return empireArmy.units;
    // case 'wood elves':
    //   return woodElvesArmy.units;
    // case 'dark elves':
    //   return darkElvesArmy.units;
    // case 'wood elves':
    //   return woodElvesArmy.units;
    // case 'high elves':
    //   return highElvesArmy.units;
    // case 'chaos':
    //   return chaosArmy.units;
    // case 'dwarfs':
    //   return dwarfsArmy.units;
    // case 'skaven':
    //   return skavenArmy.units;
    // case 'lizardmen':
    //   return lizardmenArmy.units;
    // case 'bretonnia':
    //   return bretonniaArmy.units;
    // case 'daemons':
    //   return daemonsArmy.units;
    // case 'vampire':
    //   return vampireArmy.units;
    // case 'dogsOfWar':
    //   return dogsOfWarArmy.units;
    // case 'ogre':
    //   return ogreArmy.units;
    // case 'albion':
    //   return albionArmy.units;
    // case 'goblin':
    //   return goblinArmy.units;
    // case 'witchHunter':
    //   return witchHunterArmy.units;
    // case 'norse':
    //   return norseArmy.units;
    // case 'cathay':
    //   return cathayArmy.units;
    // case 'nippon':
    //   return nipponArmy.units;
    // case 'ror':
    //   return rorArmy.units;
    // case 'chaosDwarfs':
    //   return chaosDwarfsArmy.units;
    default:
      return FallbackArmy.units;
  }
});

// // // Selected Army
// // const selectedArmy = ref<UnitForCalculator[]>([]);
// // watch(
// //   () => faction.value,
// //   () => (selectedArmy.value = faction.value.units),
// // );

// Reset Points, Armylist and MinButton
watch(
  () => [selectedFaction.value, selectedArmySize.value],
  () => {
    currentPoints.value = 0;
    disableButton.value = !selectedFaction.value;
    armyList.value = [];
    minUnits.value = [];
  },
);

function addItem(_event: PointerEvent, row: any) {
  currentPoints.value += row.item.points;
  if (armyList.value.length) {
    // armyList.value.find((e: UnitForCalculator) =>
    //   row.item.name === e.name ? e.quantity++ : armyList.value.push(row.item),
    // );
    armyList.value.find((e: UnitForCalculator) => {
      if (row.item.name === e.name) {
        console.log('gefunden');
        return e.quantity++;
      } else {
        console.log(row.item, 'nicht gefunden');
        return armyList.value.push(row.item);
      }
    });

    // armyList.value.find((e: UnitForCalculator) => {
    //   if (row.item.name === e.name) {
    //     return console.log('gefunden', row.item.name, '=', e.name);
    //   }
    //   return armyList.value.push(row.item);
    // });
    // console.log(armyList.value);
    // const a = armyList.value.find((e: any) => e.name === row.item.name);
    // if (armyList.value.find((e: any) => e.name === row.item.name)) {
    //   armyList.value.find((e) => )
    // } else armyList.value.push(row.item);
  } else armyList.value.push(row.item);
}

// function findDuplicate(name: string) {
//   armyList.value.find();
// }
// if (armyList.value.length) {
//   armyList.value.find(
//     ({ name }) => name === 'Skeletons',
//     // if (e.name === row.item.name) {
//     //   return e.quantity++;
//     // } else {
//     //   console.log('e.name', e.name);
//     //   console.log('armylist2', armyList.value);
//     //   console.log('row.name', row.item.name);
//     //   return armyList.value.push(row.item);
//     // }
//   );
// } else {
//   armyList.value.push(row.item);
// }

function removeItem(index: number, item: UnitForCalculator) {
  armyList.value.splice(index, 1);
  currentPoints.value -= item.points;
}

function checkMinMax() {
  const minUnit: any = [];
  faction.value.forEach((unit: UnitForCalculator) => {
    if (typeof unit.min === 'number') {
      const a = { name: '', min: 0 };
      a.name = unit.name;
      a.min = unit.min;
      minUnit.push(a);
    }
  });
}
const minUnits = ref();

// findMin
const disableButton = ref(true);
function findMin() {
  disableButton.value = true;
  minUnits.value = faction.value.filter((e) => typeof e.min === 'number');
  minUnits.value.forEach((e: any) => {
    if (selectedArmySize.value < 2000) {
      if (e.min === 2) {
        e.points += e.points;
        e.quantity += e.quantity;
      } else if (e.min === 3) {
        e.points += e.points;
        e.points += e.points / 2;
        e.quantity += e.quantity;
        e.quantity += e.quantity - 1;
      } else if (e.min === 4) {
        e.points += e.points;
        e.points += e.points;
        e.quantity += e.quantity;
        e.quantity += e.quantity;
      }
    } else if (e.min === 2) {
      e.points += e.points;
      e.points += e.points;
      e.quantity += e.quantity;
      e.quantity += e.quantity;
    }
  });
  armyList.value = minUnits.value;

  // faction.value.forEach((unit: UnitForCalculator) => {
  //   if (selectedArmySize.value < 2000) {
  //     if (unit.min === 1) {
  //       addMinValues(1, unit);
  //     } else if (unit.min === 2) {
  //       addMinValues(2, unit);
  //     } else if (unit.min === 3) {
  //       addMinValues(3, unit);
  //     } else return 0;
  //   }
  //   if (selectedArmySize.value === 2000) {
  //     if (unit.min === 1) {
  //       if (unit.max === 1) {
  //         addMinValues(1, unit);
  //       } else addMinValues(2, unit);
  //     } else if (unit.min === 2) {
  //       addMinValues(4, unit);
  //     } else if (unit.min === 3) {
  //       addMinValues(6, unit);
  //     } else return 0;
  //   }
  // });
}

// function addMinValues(min: number, unit: UnitForCalculator) {
//   for (let a = 0; a < min; a++) {
//     if (armyList.value.find((e) => e.name === unit.name)) {
//       armyList.value.forEach((a) => {
//         if (a.name === unit.name) {
//           a.points += unit.points;
//           a.quantity++;
//           currentPoints.value += unit.points;
//         }
//       });
//     } else {
//       armyList.value.push(unit);
//       currentPoints.value += unit.points;
//     }
//   }
// }
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
