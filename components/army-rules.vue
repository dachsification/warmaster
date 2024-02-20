<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">{{ armylistHeader[0] }}</th>
        <th class="text-left">{{ armylistHeader[1] }}</th>
        <th class="text-left">{{ armylistHeader[2] }}</th>
        <th class="text-left">{{ armylistHeader[3] }}</th>
        <th class="text-left">{{ armylistHeader[4] }}</th>
        <th class="text-left">{{ armylistHeader[5] }}</th>
        <th class="text-left">{{ armylistHeader[6] }}</th>
        <th class="text-left">{{ armylistHeader[7] }}</th>
        <th class="text-left">{{ armylistHeader[8] }}</th>
        <th class="text-left">{{ armylistHeader[9] }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in armylist" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.name }}</td>
      </tr>
    </tbody>
  </v-table>
  <v-row justify="center">
    <v-col cols="auto">
      <p>special rules</p>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
const armylistHeader = computed(() => [
  $t('armylistHeader.troop'),
  $t('armylistHeader.type'),
  $t('armylistHeader.attack'),
  $t('armylistHeader.hits'),
  $t('armylistHeader.armour'),
  $t('armylistHeader.command'),
  $t('armylistHeader.unitSize'),
  $t('armylistHeader.points'),
  $t('armylistHeader.minMax'),
  $t('armylistHeader.special'),
]);

const armylist = computed(() => [
  { name: $t('armylistHeader.troop') },
  { name: $t('armylistHeader.type') },
  { name: $t('armylistHeader.attack') },
  { name: $t('armylistHeader.hits') },
  { name: $t('armylistHeader.armour') },
  { name: $t('armylistHeader.command') },
  { name: $t('armylistHeader.unitSize') },
  { name: $t('armylistHeader.points') },
  { name: $t('armylistHeader.minMax') },
  { name: $t('armylistHeader.special') },
]);
</script>
