<template>
  <v-app>
    <navbar />

    <v-main class="grey darken-4 white--text">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/navbar";

export default {
  components: {
    Navbar,
  },
};
</script>