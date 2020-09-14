<template>
  <v-app>
    <v-app-bar flat color="primary" min-height="80" dense dark class="py-4">
      <v-toolbar-title to="/">{{ $t('AppTitle') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <LoginLogout/>
    </v-app-bar>
    <v-content>
      <slot />
    </v-content>
    <v-footer color="primary" padless>
      <v-row justify="center" no-gutters>
        <v-col class="primary py-4 text-center white--text" cols="12">
          <strong>{{ $t('AppTitle') }}</strong>
          &nbsp; &copy; {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>

import i18n from "@/locales/i18n.js"
import LoginLogout from "@/layouts/components/LoginLogout.vue"

export default {
  i18n,
  components: {
    LoginLogout
  },
  data() {
    return {

    };
  },
  methods: {
    changeLanguage: function(event) {
      console.log(event);
    }
}};
</script>