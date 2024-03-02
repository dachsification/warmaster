<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-select
          v-model="select"
          label="Select Army"
          :items="armies"
          item-title="title"
          item-value="title"
          variant="solo" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-data-table :headers="headers" :items="items" :search="search" item-value="name">
          <template #top>
            <v-text-field v-model="search" label="Search" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import Armies from '../../database/armies-overview.json';
const armies = Armies.armies;
const select = ref('');
const search = ref('');
const headers = ref();
headers.value = [
  {
    title: 'Troop',
    align: 'start',
    key: 'troop',
  },
  {
    title: 'Type',
    align: 'end',
    key: 'type',
  },
  {
    title: 'Attacks',
    align: 'end',
    key: 'attacks',
  },
  {
    title: 'Hits',
    align: 'end',
    key: 'hits',
  },
  {
    title: 'Armour',
    align: 'end',
    key: 'armour',
  },
  {
    title: 'Command',
    align: 'end',
    key: 'command',
  },
  {
    title: 'Unitsize',
    align: 'end',
    key: 'unitsize',
  },
  {
    title: 'Point per Unit',
    align: 'end',
    key: 'ppu',
  },
  {
    title: 'Min/Max',
    align: 'end',
    key: 'minMax',
  },
  {
    title: 'Special',
    align: 'end',
    key: 'special',
  },
];

const items = ref([
  {
    name: 'Nebula GTX 3080',
    image: '1.png',
    price: 699.99,
    rating: 5,
    stock: true,
  },
  {
    name: 'Galaxy RTX 3080',
    image: '2.png',
    price: 799.99,
    rating: 4,
    stock: false,
  },
  {
    name: 'Orion RX 6800 XT',
    image: '3.png',
    price: 649.99,
    rating: 3,
    stock: true,
  },
  {
    name: 'Vortex RTX 3090',
    image: '4.png',
    price: 1499.99,
    rating: 4,
    stock: true,
  },
  {
    name: 'Cosmos GTX 1660 Super',
    image: '5.png',
    price: 299.99,
    rating: 4,
    stock: false,
  },
]);
</script>
