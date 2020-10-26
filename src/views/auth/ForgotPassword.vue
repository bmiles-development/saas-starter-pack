<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card outlined>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>{{ $t("ForgotPassword") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <span>Source</span>
          </v-tooltip>
        </v-toolbar>
        <v-progress-linear
          v-if="apiRequest"
          indeterminate
          color="primary"
        ></v-progress-linear>
        <v-card-text>
          <v-form>
            <p>{{ $t("EnterEmail") }}:</p>
            <v-text-field
              v-model="username"
              :label="username"
              id="email"
              name="email"
              prepend-icon="mdi-email"
              type="text"
              :error-messages="emailErrors"
            ></v-text-field>
            <p align="center">
              {{ $t("ResendCodeQuestionText") }}
              <a href="login">{{ $t("ResendCodeLinkText") }}</a>
            </p>
            <v-row align="center" justify="center">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" v-on:click="validate" large>{{
                  $t("ResetPassword")
                }}</v-btn>
              </v-card-actions>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
      <v-col cols="12">
        <v-spacer></v-spacer>
        <p align="center">
          <a href="login">{{ $t("BackToLogin") }}</a>
        </p>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import LoginOrSignupLayout from "@/layouts/LoginOrSignupLayout";
import i18n from "@/locales/i18n.js";
import { required, email } from "vuelidate/lib/validators";

export default {
  i18n,
  data: () => ({
    apiRequest: false,
    username: "",
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push(this.$t("Errors.required"));
      !this.$v.username.email && errors.push(this.$t("Errors.email"));
      return errors;
    },
  },
  validations: {
    username: {
      required,
      email,
    },
  },
  created() {
    this.$emit("update:layout", LoginOrSignupLayout);
  },
  methods: {
    validate() {
      this.$v.$touch();
      if (this.$v.username.$invalid) return;
      this.confirmUser();
    },
    confirmUser() {
      console.log("confirm user");
      this.apiRequest = true;
    },
  },
};
</script>