<template>
  <v-data-table
    v-model:expanded="expanded"
    :headers="factionHeaders"
    :items="units"
    :search="search"
    item-value="name"
    density="compact"
    items-per-page="50"
    show-expand
    align="center"
  >
    <template #top>
      <v-text-field
        v-model="search"
        label="Search"
      />
    </template>
    <template #expanded-row="{ columns, item }">
      <tr>
        <td
          :colspan="columns.length"
          :width="columns.length"
        >
          {{ item?.special }}
        </td>
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
defineProps<{ units: Unit[] }>();
const factionHeaders = ref([
  {
    title: 'Name',
    align: 'start',
    key: 'name',
  },
  {
    title: 'Type',
    align: 'start',
    key: 'type',
  },
  {
    title: 'Melee',
    align: 'start',
    key: 'meleeAttack',
  },
  {
    title: 'Range',
    align: 'start',
    key: 'rangeAttack',
  },
  {
    title: 'Hits',
    align: 'start',
    key: 'hits',
  },
  {
    title: 'Armour',
    align: 'start',
    key: 'armour',
  },
  {
    title: 'Command',
    align: 'start',
    key: 'command',
  },
  {
    title: 'Unitsize',
    align: 'start',
    key: 'size',
  },
  {
    title: 'Point per Unit',
    align: 'start',
    key: 'points',
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
    title: 'Special',
    align: 'start',
    key: 'data-table-expand',
  },
] as const);
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
