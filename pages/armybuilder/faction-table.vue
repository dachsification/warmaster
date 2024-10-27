<template>
  <v-data-table
    :headers="factionHeaders"
    :items="faction.units"
    density="compact"
    item-value="name"
    items-per-page="-1"
    hide-default-footer
    @click:row="addUnit"
  />
</template>
<script setup lang="ts">
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

const props = defineProps<{ selectedFaction: string }>();
const emit = defineEmits(['add-unit', 'fill-faction']);

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
  switch (props.selectedFaction.toLowerCase()) {
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
    width: '110px',
  },
  {
    title: 'Max',
    align: 'start',
    key: 'max',
    width: '110px',
  },
  {
    title: 'Points',
    align: 'start',
    key: 'points',
    width: '110px',
  },
] as const);

// Emit Selected Unit to Parent
function addUnit(event: PointerEvent, row: any) {
  emit('add-unit', event, row);
}

// Emit Selected Faction to Parent
watch(
  () => faction.value,
  () => emit('fill-faction', faction.value),
);
</script>
