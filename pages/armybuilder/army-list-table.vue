<template>
  <v-data-table
    :headers="armyListHeaders"
    :items="armyList"
    density="compact"
    item-value="name"
    hide-default-footer
    items-per-page="-1"
    :no-data-text="emptyArmyList"
    :row-props="(row) => changeColor(row.item)"
    @click:row="removeItem"
  >
    <template #item.actions="{ item }">
      <v-icon
        icon="mdi-pencil"
        @click.stop="$emit('edit-item', item)"
      />
      <v-icon
        icon="mdi-delete"
        @click.stop="$emit('delete-item', item)"
      />
      <magic-item-dialog
        :is-dialog-open="isDialogOpen"
        :item="item"
        @close-dialog="$emit('close-dialog')"
        @add-item="addMagic"
      />
    </template>
    <template #expanded-row="{ columns, item }">
      <tr v-if="item.magicItem">
        <td
          :colspan="columns.length"
          :width="columns.length"
        >
          {{ item.magicItem[0]?.points }} Points - {{ item.magicItem[0]?.name }}: {{ item.magicItem[0]?.rule }}
          <!-- v-for-schleife -->
        </td>
      </tr>
    </template>
    <template #item.data-table-expand="{ item, toggleExpand, internalItem }">
      <v-icon
        v-if="item.magicItem"
        icon="mdi-plus"
        @click="toggleExpand(internalItem)"
      />
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
import MagicItemDialog from './magic-item-dialog.vue';

defineProps<{ armyList: UnitForCalculator[]; isDialogOpen: boolean }>();
const emit = defineEmits(['remove-item', 'edit-item', 'delete-item', 'add-magic', 'close-dialog']);

const emptyArmyList = 'No Faction selected - Armylist is empty';

const armyListHeaders = ref([
  {
    title: 'Quantity',
    align: 'center',
    key: 'quantity',
    sortable: false,
    width: '110px',
  },
  {
    title: 'Name',
    align: 'start',
    key: 'name',
  },
  {
    title: 'Points',
    align: 'center',
    key: 'points',
    width: '110px',
  },
  {
    title: 'Magic Items',
    align: 'center',
    key: 'actions',
    sortable: false,
    nowrap: true,
    width: '110px',
  },
  {
    title: 'Show Item',
    align: 'center',
    key: 'data-table-expand',
    sortable: false,
    nowrap: true,
    width: '110px',
  },
] as const);

function changeColor(item: any) {
  if (item.min > item.quantity) return { style: 'color: red!important' };
}

function removeItem(event: PointerEvent, row: any) {
  emit('remove-item', event, row);
}

function addMagic(magicItem: MagicItem) {
  emit('add-magic', magicItem);
}
</script>
