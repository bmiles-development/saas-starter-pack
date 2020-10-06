<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card outlined>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>{{ $t("Login") }}</v-toolbar-title>
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
        <v-card-text class="pb-0">
          <v-form>
            <v-text-field
              v-model="username"
              :label="$t('Email')"
              name="username"
              prepend-icon="mdi-account"
              type="text"
              :error-messages="emailErrors"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :label="$t('Password')"
              id="password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              :error-messages="passwordErrors"
            ></v-text-field>

            <p align="right">
              <a href="forgot_password">{{ $t("ForgotPassword") }} ?</a>
            </p>
          </v-form>
          <v-snackbar v-model="snackbar" :vertical="vertical">
            {{ message }}
          </v-snackbar>
        </v-card-text>

        <v-card-actions class="pt-0">
          <v-row align="center" justify="center">
            <v-card-actions>
              <v-btn
                large
                depressed
                color="primary"
                class
                v-on:click="validate"
                >{{ $t("Login") }}</v-btn
              >
            </v-card-actions>
          </v-row>
        </v-card-actions>
      </v-card>
      <v-col cols="12">
        <v-spacer></v-spacer>
        <p align="center">
          {{ $t("NoAccount") }}
          <a href="signup">{{ $t("CreateAccount") }}</a>
        </p>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import LoginOrSignupLayout from "@/layouts/LoginOrSignupLayout";
import i18n from "@/locales/i18n.js";
import { Auth } from "aws-amplify";
import vuetify from "@/plugins/vuetify";
import { Vuelidate } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import Vue from "vue";

Vue.use(Vuelidate);

export default {
  vuetify,
  i18n,
  data() {
    return {
      apiRequest: false,
      username: this.$route.query.email,
      password: "",
      snackbar: false,
      vertical: true,
      message: "",
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push(this.$t("Errors.required"));
      !this.$v.username.email && errors.push(this.$t("Errors.email"));
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push(this.$t("Errors.required"));
      return errors;
    },
  },
  validations: {
    password: {
      required,
      minLength: minLength(10),
    },
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
      if (this.$v.password.$invalid) return;
      this.loginUser();
    },
    loginUser() {
      this.apiRequest = true;
      Auth.signIn(this.username, this.password, {})
        .then((data) => {
          this.apiRequest = false;
          console.log(data);
          this.$router.push({
            name: "dashboard",
          });
        })
        .catch((err) => {
          this.apiRequest = false;
          console.log("error login", err);
          this.snackbar = true;
          this.message = err.message;
        });
    },
  },
};
</script>