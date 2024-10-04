<template>
  <!-- pdfs werden nach npm nuxi build automatisch aus .output/public/pdfs geladen -->
  <v-row
    align="center"
    justify="center"
  >
    <v-col cols="auto">
      <h1 class="text-primary text-h2 font-weight-bold mb-3">{{ $t('titles.english') }}</h1>
      <NuxtLink
        href="/pdfs/WMR_Armies_2.24.pdf"
        target="_blank"
        download="WMR_Armies_2.24.pdf"
        >Armies</NuxtLink
      >
      <p></p>
      <NuxtLink
        href="/pdfs/WMR_Rules_2.0.1.pdf"
        target="_blank"
        download="WMR_Rules_2.0.1.pdf"
        >Rules</NuxtLink
      >
    </v-col>
  </v-row>
</template>
