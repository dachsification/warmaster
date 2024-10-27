<template>
  <v-dialog
    :model-value="isDialogOpen"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ $t('labels.addMagicItem') }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-data-table
              :headers="itemHeaders"
              :items="itemList"
              density="compact"
              item-value="name"
              hide-default-footer
              items-per-page="-1"
              @click:row="addMagicItem"
            >
            </v-data-table
          ></v-row>
        </v-container>
      </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import Items from '../../database/magic-items.json';
defineProps<{ isDialogOpen: boolean }>();
const emit = defineEmits(['close-dialog', 'add-item']);
const itemList: MagicItem[] = Items.items;
const itemHeaders = ref([
  {
    title: 'Name',
    align: 'start',
    key: 'name',
  },
  {
    title: 'Points',
    align: 'center',
    key: 'points',
    sortable: false,
  },
  {
    title: 'Type',
    align: 'end',
    key: 'type',
  },
] as const);
function addMagicItem(_event: PointerEvent, row: any) {
  const magicItem: MagicItem = { ...row.item };
  emit('close-dialog');
  emit('add-item', magicItem);
}
</script>
