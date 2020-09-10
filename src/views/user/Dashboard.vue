<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img class="my-3 logo" contain height="200" />
      </v-col>
      <v-col class="mb-4">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import DashboardLayout from "@/layouts/DashboardLayout.vue";


export default {
  name: "Home",
  data: () => ({
  }),
  created() {
    this.$emit("update:layout", DashboardLayout);
  }
};
</script>