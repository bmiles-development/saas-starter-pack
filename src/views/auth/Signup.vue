<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card outlined>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>{{signupTitleText}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <span>Source</span>
          </v-tooltip>
        </v-toolbar>
        <v-progress-linear v-if="apiRequest" indeterminate color="primary"></v-progress-linear>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="username"
              :label="signupText"
              id="username"
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
          </v-form>
        </v-card-text>
        <v-row align="center" justify="center">
          <v-card-actions>
            <v-btn
              depressed
              color="primary"
              class="mb-2"
              v-on:click="createAccount"
              large
            >{{signupActionText}}</v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
      <v-col cols="12">
        <v-spacer></v-spacer>
        <p align="center">
          {{loginQuestionText}}
          <a href="login">{{loginLinkText}}</a>
        </p>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import LoginOrSignupLayout from "@/layouts/LoginOrSignupLayout";
import { I18n } from "@aws-amplify/core";
import { Auth } from "aws-amplify";

export default {
  data: () => ({
    username: "",
    password: "",
    signupActionText: I18n.get("Create Account"),
    signupText: I18n.get("Email"),
    passwordText: I18n.get("Password"),
    signupTitleText: I18n.get("Create Account"),
    loginQuestionText: I18n.get("Have an account?"),
    loginLinkText: I18n.get("Login"),
    apiRequest: false
  }),
  created() {
    this.$emit("update:layout", LoginOrSignupLayout);
  },
  methods: {
    async createAccount() {
      this.apiRequest = true;
      Auth.signUp({
        username: this.username,
        password: this.password,
        attributes: {
          email: this.username
        },
        validationData: [] // optional
      })
        .then(data => {
          this.apiRequest = false;
          console.log(data);
          this.$router.push({
            name: "confirmSignup",
            query: { email: this.username }
          });
        })
        .catch(err => {
          this.apiRequest = false;
          console.log(err);
        });
    }
  }
};
</script>