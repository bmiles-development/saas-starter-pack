<template>
  <component :is="layout">
    <router-view :layout.sync="layout"></router-view>
  </component>
</template>

<script>
import Vue from "vue";
import { Vuelidate } from "vuelidate";
import vuetify from "@/plugins/vuetify";

Vue.use(Vuelidate);
export default {
  vuetify,
  name: "App",
  data() {
    return {
      layout: `div`,
    };
  },
  created() {},
};
</script>
