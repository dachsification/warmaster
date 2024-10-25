<template>
  <!-- pdfs werden nach npx nuxi build automatisch aus .output/public/pdfs geladen -->
  <v-row
    align="center"
    justify="center"
  >
    <v-col cols="auto">
      <h1 class="text-primary text-h2 font-weight-bold mb-3">{{ $t('titles.english') }}</h1>
      <NuxtLink href="https://www.wm-revolution.com/articles/download.html">Armies</NuxtLink>
      <p></p>
      <NuxtLink href="https://www.wm-revolution.com/articles/download.html">Rules</NuxtLink>
    </v-col>
  </v-row>
</template>
