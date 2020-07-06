<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card outlined>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>{{titleText}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <span>Source</span>
          </v-tooltip>
        </v-toolbar>
        <v-progress-linear v-if="apiRequest" indeterminate color="primary"></v-progress-linear>
        <v-card-text>
          <v-form>
            <p>{{enterEmailText}}:</p>
            <v-text-field
              disabled
              :label="username"
              id="email"
              name="email"
              prepend-icon="mdi-email"
              type="text"
            ></v-text-field>
            <p align="center">
          {{resendCodeQuestionText}}
          <a href="login">{{resendCodeLinkText}}</a>
        </p>
        <v-row align="center" justify="center">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" v-on:click="confirmUser" large>{{signupActionText}}</v-btn>
          </v-card-actions>
        </v-row>
          </v-form>
        </v-card-text>
      </v-card>
      <v-col cols="12">
        <v-spacer></v-spacer>
        <p align="center">
          <a href="login">{{loginLinkText}}</a>
        </p>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import LoginOrSignupLayout from "@/layouts/LoginOrSignupLayout";
import { I18n } from "@aws-amplify/core";

export default {
  data: () => ({
    enterEmailText: I18n.get("Please Enter your email"),
    resendCodeQuestionText: I18n.get("Didn't get your code?"),
    resendCodeLinkText: I18n.get("Resend Confirmation Code"),
    signupActionText: I18n.get("Reset Password"),
    confirmationText: I18n.get("Confirmation Code"),
    titleText: I18n.get("Forgot Password"),
    loginLinkText: I18n.get("Back To Login"),
    apiRequest: false,
    username: "test@test.com"
  }),
  created() {
    this.$emit("update:layout", LoginOrSignupLayout);
  },
  methods: {
    confirmUser() {
      this.apiRequest = true;
    }
  }
};
</script>