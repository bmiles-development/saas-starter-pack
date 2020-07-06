<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>{{confirmationTitleText}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <span>Source</span>
          </v-tooltip>
        </v-toolbar>
        <v-progress-linear v-if="apiRequest" indeterminate color="primary"></v-progress-linear>
        <v-card-text>
          <v-form>
            <v-text-field
              disabled
              :label="username"
              id="confirmationCode"
              name="username"
              prepend-icon="mdi-email"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="code"
              :label="confirmationText"
              id="code"
              name="code"
              prepend-icon="mdi-lock"
              type="text"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <p align="right" class="pr-4">
          {{resendCodeQuestionText}}
          <a href="login">{{resendCodeLinkText}}</a>
        </p>
        <v-row align="center" justify="center">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="mb-2"
              align="center"
              color="primary"
              v-on:click="confirmUser"
              large
            >{{signupActionText}}</v-btn>
          </v-card-actions>
        </v-row>
        <v-spacer></v-spacer>
      </v-card>
      <v-col cols="12">
        <v-spacer></v-spacer>
        <p align="center" class="mt-1">
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
  data() {
    return {
      resendCodeQuestionText: I18n.get("Didn't get your code?"),
      resendCodeLinkText: I18n.get("Resend Confirmation Code"),
      signupActionText: I18n.get("Confirm"),
      confirmationText: I18n.get("Confirmation Code"),
      confirmationTitleText: I18n.get("Confirm Sign Up"),
      loginQuestionText: I18n.get("Have an account?"),
      loginLinkText: I18n.get("Login"),
      apiRequest: false,
      username: this.$route.query.email,
      code: ""
    };
  },
  created() {
    // this.username = this.$route.query.email
    this.$emit("update:layout", LoginOrSignupLayout);
  },
  methods: {
    async confirmUser() {
      this.apiRequest = true;
      Auth.confirmSignUp(this.username, this.code, {})
        .then(data => {
          this.apiRequest = false;
          this.$router.push({ name: "login", query: { email: this.username } });
          console.log(data);
        })
        .catch(err => {
          this.apiRequest = false;
          console.log("error confirming sign up", err);
        });
    }
  }
};
</script>