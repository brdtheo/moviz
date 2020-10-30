<template>
  <v-app>
    <navbar />

    <v-main class="grey darken-4 white--text">
      <v-container class="pa-0">
        <router-view></router-view>
      </v-container>
    </v-main>

    <mfooter />
  </v-app>
</template>

<script>
import navbar from "./components/navbar";
import mfooter from "./components/footer";

export default {
  components: {
    navbar,
    mfooter,
  },
};
</script>

<style>
.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>