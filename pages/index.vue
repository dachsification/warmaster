<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="auto">
        <v-img
          src="https://picsum.photos/300/150?random"
          style="width: 400px; height: 200px; max-width: 100%"
          alt="Logo"
        />
      </v-col>
      <v-col
        cols="auto"
        class="text-center mt-3"
      >
        <h1 class="text-primary text-h2 font-weight-bold mb-3">{{ $t('titles.warmasterGermany') }}</h1>
        <p class="text-secondary mb-10 mx-auto ms-lg-0">{{ $t('text.mainSubtitle') }}</p>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="auto">
        <h1 class="pt-12">WIP</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
