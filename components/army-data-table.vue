<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="headers"
    :items="units"
    :search="search"
    item-value="name"
    density="compact"
    items-per-page="25"
    show-expand
  >
    <template #bottom />
    <template #top>
      <v-text-field
        v-model="search"
        label="Search"
      />
    </template>
    <template #item.specialIcon="{ value }">
      <v-icon
        v-for="(icon, index) in value"
        :key="index"
        :icon="icon.name"
      />
    </template>
    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">{{ item?.special }}</td>
      </tr>
    </template>
    <template #item.data-table-expand="{ item, toggleExpand, internalItem }">
      <v-btn
        v-if="item.special"
        flat
        @click="toggleExpand(internalItem)"
      >
        <v-icon icon="mdi-plus" />
      </v-btn>
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
<style scoped>
.v-table :deep(th) {
  padding: 0px 8px !important;
}

.v-table :deep(td) {
  padding: 0px 8px !important;
}
</style>
