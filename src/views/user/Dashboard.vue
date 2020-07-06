<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img class="my-3 logo" contain height="200" />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">{{WelcomeText}} {{AppTitle}}</h1>
        <p class="subheading font-weight-regular">{{AppBiLine}}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { I18n } from "@aws-amplify/core";

export default {
  name: "Home",
  data: () => ({
    
    WelcomeText: I18n.get("Welcome to"),
    AppTitle: I18n.get("App"),
    AppBiLine: I18n.get("The Ultimate App")
  }),
  created() {
    this.$emit("update:layout", DashboardLayout);
  }
};
</script>