<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn color="primary" v-bind="props">
        <v-icon icon="mdi-menu" />
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <header-menu-button :data="armies" :label="$t('labels.armies')" />
        <header-menu-button :data="rulesList" :label="$t('labels.rules')" />
        <header-basic-button
          v-for="item in basicButtons"
          :key="item.title"
          :url-path="item.urlPath"
          :label="item.title" />
        <v-divider vertical class="mx-4" />
        <header-settings-button />
      </v-list>
    </v-card>
  </v-menu>
</template>
<script setup lang="ts">
const { t: $t } = useI18n();

const armies = computed(() => [
  { title: $t('armies.tombKing'), urlPath: '/armies/tomb-kings-army' },
  { title: $t('armies.albion'), urlPath: '/armies/albion-army' },
  { title: $t('armies.araby'), urlPath: '/armies/araby-army' },
  { title: $t('armies.beastmen'), urlPath: '/armies/beastmen-army' },
  { title: $t('armies.bretonnia'), urlPath: '/armies/bretonnia-army' },
  { title: $t('armies.cathay'), urlPath: '/armies/cathay-army' },
  { title: $t('armies.chaos'), urlPath: '/armies/chaos-army' },
  { title: $t('armies.chaosDwarfs'), urlPath: '/armies/chaos-dwarfs-army' },
  { title: $t('armies.daemons'), urlPath: '/armies/daemons-army' },
  { title: $t('armies.darkElves'), urlPath: '/armies/dark-elves-army' },
  { title: $t('armies.dogsOfWar'), urlPath: '/armies/dogs-of-war-army' },
  { title: $t('armies.dwarfs'), urlPath: '/armies/dwarfs-army' },
  { title: $t('armies.goblin'), urlPath: '/armies/goblin-army' },
  { title: $t('armies.highElves'), urlPath: '/armies/high-elves-army' },
  { title: $t('armies.kislev'), urlPath: '/armies/kislev-army' },
  { title: $t('armies.lizardmen'), urlPath: '/armies/lizardmen-army' },
  { title: $t('armies.nippon'), urlPath: '/armies/nippon-army' },
  { title: $t('armies.norse'), urlPath: '/armies/norse-army' },
  { title: $t('armies.ogre'), urlPath: '/armies/ogre-kingdoms-army' },
  { title: $t('armies.orcs'), urlPath: '/armies/orcs-army' },
  { title: $t('armies.ror'), urlPath: '/armies/ror-army' },
  { title: $t('armies.skaven'), urlPath: '/armies/skaven-army' },
  { title: $t('armies.empire'), urlPath: '/armies/the-empire-army' },
  { title: $t('armies.vampire'), urlPath: '/armies/vampire-counts-army' },
  { title: $t('armies.witchHunter'), urlPath: '/armies/witch-hunters-army' },
  { title: $t('armies.woodElves'), urlPath: '/armies/wood-elves-army' },
]);

const rulesList = computed(() => [
  { title: $t('titles.english'), urlPath: '/rules/english-rules' },
  { title: $t('titles.german'), urlPath: '/rules/german-rules' },
  // { title: $t('titles.iconic'), urlPath: '/rules/iconic-rules' },
]);

const basicButtons = computed(() => [
  { title: $t('labels.learn'), urlPath: '/get-started' },
  { title: $t('labels.armybuilder'), urlPath: '/armybuilder' },
  { title: $t('labels.guardians'), urlPath: '/guardians' },
  { title: $t('labels.about'), urlPath: '/about' },
]);
</script>
