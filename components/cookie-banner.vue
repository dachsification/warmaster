<template>
  <v-dialog
    v-model="cookieBanner"
    max-width="400"
    persistent
  >
    <v-card
      append-icon="mdi-cookie"
      :text="$t('text.cookie')"
      :title="$t('titles.cookie')"
    >
      <v-btn
        color="green"
        @click="acceptCookieBanner"
      >
        {{ $t('labels.accept') }}
      </v-btn>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { useCookieBannerStore } from '../store/cookieBanner';

const cookiebannerStore = useCookieBannerStore();
const { acceptCookie } = cookiebannerStore;
const { cookieBanner } = storeToRefs(cookiebannerStore);

function acceptCookieBanner() {
  cookieBanner.value = acceptCookie(cookieBanner.value);
}
</script>
