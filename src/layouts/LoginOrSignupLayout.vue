<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-layout align-center justify-center>
          <v-col cols="12">
            <a href="/"
              ><v-img
                :src="require('@/assets/logo_small.svg')"
                class="my-3"
                contain
                height="80"
            /></a>
            <slot />
          </v-col>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>