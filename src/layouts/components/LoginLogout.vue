<template>
  <div>
  <template v-if="user">
    <v-menu bottom transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn text icon class="mr-2" v-on="on">
          <v-icon dark>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-on:click="accountPage">
            <v-list-item-icon class="mr-1">
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t('YourAccount')"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-on:click="signOut">
            <v-list-item-icon class="mr-1">
              <v-icon>mdi-door</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t('Logout')"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </template>
  <template v-else>
    <v-btn text :to="{name: 'signup'}">{{$t('SignUp')}}</v-btn>
    <v-btn text :to="{name: 'login'}">{{$t('Login')}}</v-btn>
    <!-- <v-btn text v-on:click="changeLanguage">test</v-btn> -->
  </template>
  </div>
</template>
<script>

import { Auth } from "aws-amplify";
import i18n from "@/locales/i18n.js"

export default {
  i18n,
  data() {
    return {
      user: ""
    };
  },
  methods: {
    accountPage: function() {
      this.$router.push({
            name: "account",
          });
    },
    signOut: function() {
      Auth.signOut()
        .then(user => {
          console.log(user);
           this.$router.push({
            name: "home",
          });
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.user = Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        this.user = "";
        console.log("error");
        console.log(err);
      });
  }
};
</script>