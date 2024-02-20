<template>
  <army-content :army-keyword="armykeyword" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
definePageMeta({
  layout: 'army-layout',
});
const { t: $t } = useI18n();
const armykeyword = $t('armies.darkElves');
</script>
