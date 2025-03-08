<template>
  <v-container>
    <v-card>
      <v-card-item>
        <v-card-title class="text-primary text-h5 font-weight-medium pa-3 d-flex justify-center">
          {{ $t('text.guardiansTitle') }}
        </v-card-title>
      </v-card-item>
      <v-card-item>
        <v-row class="text-center">
          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-icon icon="mdi-plus" />
          </v-col>
          <v-col
            cols="3"
            class="d-flex align-center"
          >
            <v-divider />
          </v-col>
          <v-col cols="1">
            <v-icon icon="mdi-plus" />
          </v-col>
          <v-col
            cols="3"
            class="d-flex align-center"
          >
            <v-divider />
          </v-col>
          <v-col cols="1">
            <v-icon icon="mdi-plus" />
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-item>
      <v-card-item>
        <v-row class="text-center">
          <v-col>
            <v-card-subtitle> Intro </v-card-subtitle>
          </v-col>
          <v-col>
            <v-card-subtitle> Resources </v-card-subtitle>
          </v-col>
          <v-col>
            <v-card-subtitle> tournaments </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-item>
        <v-row class="text-center">
          <v-col>
            <v-card-text> Text </v-card-text>
          </v-col>
          <v-col>
            <v-card-text> Text </v-card-text>
          </v-col>
          <v-col>
            <v-card-text> Text </v-card-text>
          </v-col>
        </v-row>
      </v-card-item>
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
