<template>
  <v-app>
    <navbar />
    <v-main class="grey darken-4 white--text">
      <v-container>
        <lastestMovies />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/navbar";
import lastestMovies from "./components/lastestmovies";

export default {
  name: "App",
  components: {
    Navbar,
    lastestMovies,
  },
};
</script>

<style>
.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  justify-content: flex-end;
}
</style>