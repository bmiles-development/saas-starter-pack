<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card outlined>
        <v-progress-linear v-if="apiRequest" indeterminate color="primary"></v-progress-linear>
        <v-card-text class="pb-0">
          <v-form>
            <v-text-field disabled
              v-model="email"
              :label="userEmail"
              name="email"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :label="passwordText"
              id="password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="verifyPassword"
              :label="passwordText"
              id="verifyPassword"
              name="verifyPassword"
              type="password"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="pt-0">
          <v-row align="center" justify="center">
            <v-card-actions>
              <v-btn
                large
                depressed
                color="primary"
                class
                v-on:click="updatePassword"
              >{{updatePasswordText}}</v-btn>
            </v-card-actions>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { I18n } from "@aws-amplify/core";
import { Auth } from "aws-amplify";

export default {
  name: "Home",
  data: () => ({
    user:"",
    userEmail:"",
    emailText: I18n.get("Email"),
    updatePasswordText: I18n.get("Update Password"),
    AppBiLine: I18n.get("The Ultimate App")
  }),
  created() {
    this.$emit("update:layout", DefaultLayout);
  },
   mounted() {
    this.user = Auth.currentAuthenticatedUser()
      .then(user => {
        this.userEmail = user.attributes.email
        return user;
      })
      .catch(err => {
        this.user = "";
        console.log("error");
        console.log(err);
      });
  },
  methods: {
      updatePassword(){
          alert('ok')
      }
  },
};
</script>