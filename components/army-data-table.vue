<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="units"
    :search="search"
    item-value="name"
    density="compact"
    show-expand>
    <template #bottom />
    <template #top>
      <v-text-field v-model="search" label="Search" />
    </template>
    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          {{ item?.special }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
import UnitHeaders from '../database/unit-headers.json';
defineProps<{ units: Unit[] }>();
const headers = ref();
headers.value = UnitHeaders.headers;
const expanded = ref([]);
const search = ref('');
</script>
