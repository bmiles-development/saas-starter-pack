<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img class="my-3 logo" contain height="200" />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">{{ $t('WelcomeText')}} {{ $t('AppTitle')}}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import i18n from "@/locales/i18n.js"

export default {
  i18n,
  name: "Home",
  data: () => ({
  }),
  created() {
    this.$emit("update:layout", DefaultLayout);
  }
};
</script>

