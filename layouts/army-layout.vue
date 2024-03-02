<template>
  <v-app>
    <cookie-banner />
    <application-header />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
