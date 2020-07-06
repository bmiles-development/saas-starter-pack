<template>
  <v-app>
    <v-app-bar flat color="primary" min-height="80" dense dark class="py-4">
      <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <LoginLogout/>
    </v-app-bar>
    <v-content>
      <slot />
    </v-content>
    <v-footer color="primary" padless>
      <v-row justify="center" no-gutters>
        <v-col class="primary py-4 text-center white--text" cols="12">
          <strong>{{appTitle}}</strong>
          &nbsp; &copy; {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
import { I18n } from "@aws-amplify/core";
import { loadLocaleI18nAsync } from "@/i18n";
import LoginLogout from "@/layouts/components/LoginLogout.vue"

export default {
  components: {
    LoginLogout
  },
  data() {
    return {
      appTitle: I18n.get("App"),
    };
  },
  methods: {
    changeLanguage: function(event) {
      console.log(event);
      loadLocaleI18nAsync("fr");
    }
}};
</script>