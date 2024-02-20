<template>
  <v-navigation-drawer :location="location">
    <v-list density="compact">
      <v-list-item
        v-for="(item, index) in sidebardata"
        :key="index"
        v-bind="$attrs"
        :active="false"
        clipped
        :to="item.urlPath">
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
// i18n in urlPaths oder i18n an dieser + in allen armies Stelle entfernen
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
const props = defineProps<{
  readonly location: any; // Location ist kein String - keine Ahnung warum
  readonly title?: string;
  readonly urlPath?: string;
  armyKeyword: string;
  pageType: string;
}>();
const armyKeyword = computed(() => props.armyKeyword);
const headlines = computed(() => {
  if (props.pageType === 'armies') {
    return [
      $t('titles.title'),
      $t('titles.download'),
      $t('titles.intro'),
      $t('titles.list'),
      $t('titles.specialRules'),
    ];
  } else {
    return ['a', 'b'];
  }
});
const sidebardata = computed(() => [
  {
    title: headlines.value[0],
    urlPath: `/${props.pageType}/${armyKeyword.value}-army/#el1`,
  },
  {
    title: headlines.value[1],
    urlPath: `/${props.pageType}/${armyKeyword.value}-army/#el2 `,
  },
  {
    title: headlines.value[2],
    urlPath: `/${props.pageType}/${armyKeyword.value}-army/#el3 `,
  },
  {
    title: headlines.value[3],
    urlPath: `/${props.pageType}/${armyKeyword.value}-army/#el4 `,
  },
  {
    title: headlines.value[4],
    urlPath: `/${props.pageType}/${armyKeyword.value}-army/#el5 `,
  },
  {
    title: headlines.value[5],
    urlPath: `/${props.pageType}/${armyKeyword.value}-army/#el6 `,
  },
]);
</script>
