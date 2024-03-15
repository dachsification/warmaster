<template>
  <v-container>
    <v-card>
      <v-card-title class="text-primary text-h3 font-weight-bold pa-3">
        {{ $t('labels.guardians') }}
      </v-card-title>

      <v-card-subtitle> A guide to competitive gaming </v-card-subtitle>

      <v-card-text> Text </v-card-text>

      <v-card-actions>
        <v-btn
          href="/pdfs/WMG_v3.pdf"
          target="_blank"
          download="WMG_v3.pdf"
        >
          Guardians
        </v-btn>
      </v-card-actions>

      <v-card-actions>
        <v-btn
          href="/pdfs/WMG_v3_printer-friendly.pdf"
          target="_blank"
          download="WMG_v3_printer-friendly.pdf"
        >
          Guardians printer friendly
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
